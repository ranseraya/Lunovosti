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

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = params;
  try {
    const data = await request.json();

    const article = await prisma.articles.findUnique({
        where: { slug },
        select: { author_id: true }
    });

    if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const userRole = session.user.role.toUpperCase();
    const isOwner = article.author_id.toString() === session.user.id;

    if (userRole !== 'ADMIN' && userRole !== 'EDITOR' && !isOwner) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedArticle = await prisma.articles.update({
      where: { slug },
      data: {
        ...data,
        category_id: parseInt(data.category_id),
        author_id: parseInt(data.author_id),
        published_at: data.status && data.status.toLowerCase() === 'published' ? new Date() : null,
      },
    });
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error(`Error while updating article ${slug}:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = params;
  try {
    const article = await prisma.articles.findUnique({
        where: { slug },
        select: { author_id: true }
    });

    if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const userRole = session.user.role.toUpperCase();
    const isOwner = article.author_id.toString() === session.user.id;

    if (userRole !== 'ADMIN' && userRole !== 'EDITOR' && !isOwner) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.articles.delete({
      where: { slug },
    });
    return NextResponse.json({ message: 'Article successfully deleted' }, { status: 200 });
  } catch (error) {
    console.error(`Error while deleting article ${slug}:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}