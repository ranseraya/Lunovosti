import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { serializeBigInts } from '@/app/utils/serialize';

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
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query,
              mode: 'insensitive',
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

    return NextResponse.json(serializeBigInts(articles));
  } catch (error) {
    console.error("Error during article search:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}