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

    const article = await prisma.articles.findUnique({ where: { slug } });
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    const userRole = session.user.role.toUpperCase();
    const isOwner = article.author_id.toString() === data.author_id.toString();

    if (userRole === 'AUTHOR') {
      if (!isOwner) {
        return NextResponse.json({ error: 'Forbidden: You can only edit your own articles.' }, { status: 403 });
      }
      if (article.status === 'published' || article.status === 'archived') {
        return NextResponse.json({ error: 'Forbidden: Cannot edit a published or archived article.' }, { status: 403 });
      }
      if (data.status && data.status !== 'draft' && data.status !== 'pending_review') {
        return NextResponse.json({ error: 'Forbidden: You can only save as draft or submit for review.' }, { status: 403 });
      }
    }

    if (userRole === 'EDITOR' || userRole === 'ADMIN') {

    } else if (userRole !== 'AUTHOR') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedArticle = await prisma.articles.update({
      where: { slug },
      data: {
        ...data,
        published_at: data.status === 'published' && !article.published_at ? new Date() : article.published_at,
      },
    });
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