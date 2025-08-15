import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prisma';

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
  const { slug } = params;
  try {
    const data = await request.json();
    const { title, content, excerpt, category_id, author_id, status } = data;

    const updatedArticle = await prisma.articles.update({
      where: { slug },
      data: {
        title,
        content,
        excerpt,
        category_id: parseInt(category_id),
        author_id: parseInt(author_id),
        status,
        published_at: status.toLowerCase() === 'published' ? new Date() : null,
      },
    });
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error(`Error while updateing article ${slug}:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = params;
  try {
    await prisma.articles.delete({
      where: { slug },
    });
    return NextResponse.json({ message: 'Article successfully deleted' }, { status: 200 });
  } catch (error) {
    console.error(`Error while deleting article ${slug}:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}