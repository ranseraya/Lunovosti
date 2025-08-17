import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

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

    const articles = articlesFromDb.map(article => ({
      ...article,
      id: article.id.toString(),
      author_id: article.author_id.toString(),
      authors: {
        ...article.authors,
        id: article.authors.id.toString(),
        user_id: article.authors.user_id ? article.authors.user_id.toString() : null,
      }
    }));
    return NextResponse.json(articles);
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
    const loggedUserId = 1;
    const loggedUserRole = "AUTHOR";

    if (!["ADMIN", "AUTHOR", "EDITOR"].includes(loggedUserRole.toLocaleUpperCase())) {
      return NextResponse.json(
        { error: "You do not have permission to create articles" },
        { status: 403 }
      );
    };

    const data = await request.json();
    const { title, content, excerpt, category_id, author_id } = data;

    if (!title) {
      return NextResponse.json(
        { error: "Title can't be empty" },
        { status: 400 }
      )
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    let status = "DRAFT";
    let published_at = null;

    if (['ADMIN', 'EDITOR'].includes(loggedInUserRole.toUpperCase())) {
      if (data.status && data.status.toUpperCase() === 'PUBLISHED') {
        status = 'PUBLISHED';
        published_at = new Date();
      }
    }
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
    })
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.log("Error while creating article: ", error);
    return NextResponse.json(
      { error: "An error occurred on the server" },
      { status: 500 }
    )
  }
}