import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { serializeBigInts } from "@/app/utils/serialize";
import { slugify } from "@/app/utils/helper";

export async function GET() {
  try {
    const articlesFromDb = await prisma.articles.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        authors: true,
        categories: true,
      },
    });

    return NextResponse.json(serializeBigInts(articlesFromDb));
  } catch (error) {
    console.error("Error while fetching article:", error);
    return NextResponse.json(
      { error: 'An error occurred on the server' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'EDITOR', 'AUTHOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await request.json();
    const { title, content, excerpt, category_id, author_id, status } = data;

    if (!title) {
      return NextResponse.json(
        { error: "Title can't be empty" },
        { status: 400 }
      )
    }

    const slug = slugify(title);

    const newArticle = await prisma.articles.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        excerpt: excerpt,
        category_id: parseInt(category_id),
        author_id: parseInt(author_id),
        status: status || 'DRAFT',
        published_at: status === 'PUBLISHED' ? new Date() : null,
      }
    });

    return NextResponse.json(serializeBigInts(newArticle), { status: 201 });
  } catch (error) {
    console.log("Error while creating article: ", error);
    return NextResponse.json(
      { error: "An error occurred on the server" },
      { status: 500 }
    )
  }
}