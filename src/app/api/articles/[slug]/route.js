import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request, { params }) {
  const { slug } = params;
  try {
    const article = await prisma.articles.findUnique({
      where: { slug },
    });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error(`Error while fetching article ${slug}:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug } = params;
    const data = await request.json();
    const { status: newStatus, rejection_comment } = data;

    const article = await prisma.articles.findUnique({ where: { slug } });
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    const userRole = session.user.role.toUpperCase();
    if (userRole !== 'ADMIN' && userRole !== 'EDITOR') {
      return NextResponse.json({ error: 'Forbidden: You do not have permission to perform this action.' }, { status: 403 });
    }

    let dataToUpdate = {
      status: newStatus,
      rejection_comment: rejection_comment || null,
    };

    if (newStatus === 'draft' && article.status === 'published') {
      dataToUpdate.published_at = null;
    }

    if (newStatus === 'published' && !article.published_at) {
      dataToUpdate.published_at = new Date();
    }

    const updatedArticle = await prisma.articles.update({
      where: { slug },
      data: dataToUpdate,
    });

    if ((newStatus === 'draft' || newStatus === 'pending_review') && article.author_id) {
      const authorUser = await prisma.authors.findUnique({ where: { id: article.author_id }, select: { user_id: true } });
      if (authorUser?.user_id) {
        await prisma.notification.create({
          data: {
            user_id: authorUser.user_id,
            article_id: article.id,
            message: `Your article "${article.title}" was returned to '${newStatus}' by an editor. Reason: ${rejection_comment || 'No reason given.'}`,
            type: 'COMMENT_REPLY'
          }
        })
      }
    }

    return NextResponse.json(serializeBigInts(updatedArticle));
  } catch (error) {
    console.error(`Error updating article:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role.toUpperCase() !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    await prisma.articles.delete({ where: { slug: params.slug } });
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}