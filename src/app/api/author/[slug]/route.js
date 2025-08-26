import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prisma';
import { serializeBigInts } from '@/app/utils/serialize';

export async function GET(request, { params }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Author slug is required' }, { status: 400 });
  }

  try {
    const author = await prisma.authors.findUnique({
      where: {
        slug: slug,
      },
      include: {
        articles: {
          where: {
            status: 'published',
          },
          orderBy: {
            published_at: 'desc',
          },
          include: {
            categories: true,
          },
        },
      },
    });

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    return NextResponse.json(serializeBigInts(author));
  } catch (error) {
    console.error(`Error fetching author ${slug}:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}