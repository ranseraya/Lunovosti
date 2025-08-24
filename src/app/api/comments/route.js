import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get('article_id');

  if (!articleId) {
    return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
  }

  try {
    const comments = await prisma.comments.findMany({
      where: {
        article_id: BigInt(articleId),
      },
      include: {
        users: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const serializedComments = comments.map(comment => ({
      ...comment,
      id: comment.id.toString(),
      article_id: comment.article_id.toString(),
      user_id: comment.user_id ? comment.user_id.toString() : null,
      parent_comment_id: comment.parent_comment_id ? comment.parent_comment_id.toString() : null,
    }));


    return NextResponse.json(serializedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { article_id, content, parent_comment_id } = data;

    if (!article_id || !content) {
      return NextResponse.json({ error: 'Article ID and content are required' }, { status: 400 });
    }

    const newComment = await prisma.comments.create({
      data: {
        article_id: BigInt(article_id),
        user_id: BigInt(session.user.id),
        content,
        parent_comment_id: parent_comment_id ? BigInt(parent_comment_id) : null,
      },
    });

    const serializedComment = {
        ...newComment,
        id: newComment.id.toString(),
        article_id: newComment.article_id.toString(),
        user_id: newComment.user_id.toString(),
        parent_comment_id: newComment.parent_comment_id ? newComment.parent_comment_id.toString() : null,
      };

    return NextResponse.json(serializedComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}