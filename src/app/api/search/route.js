import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const articles = await prisma.articles.findMany({
      where: {
        status: 'published',
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
        ],
      },
      include: {
        authors: true,
        categories: true,
      },
      orderBy: {
        published_at: 'desc',
      },
    });

    const serializedArticles = articles.map(article => ({
      ...article,
      id: article.id.toString(),
      author_id: article.author_id.toString(),
      authors: {
        ...article.authors,
        id: article.authors.id.toString(),
        user_id: article.authors.user_id ? article.authors.user_id.toString() : null,
      }
    }));

    return NextResponse.json(serializedArticles);
  } catch (error) {
    console.error("Error during article search:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}