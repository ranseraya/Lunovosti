import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prisma';

// Fungsi untuk serialisasi BigInt
function serializeBigInts(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (typeof obj.toJSON === 'function') {
      return obj.toJSON();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigInts);
  }

  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'bigint') {
        newObj[key] = value.toString();
      } else {
        newObj[key] = serializeBigInts(value);
      }
    }
  }
  return newObj;
}


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
    
    const serializedAuthor = serializeBigInts(author);

    return NextResponse.json(serializedAuthor);
  } catch (error) {
    console.error(`Error fetching author ${slug}:`, error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}