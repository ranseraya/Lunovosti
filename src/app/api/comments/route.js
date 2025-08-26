import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { serializeBigInts } from '@/app/utils/serialize';

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

    return NextResponse.json(serializeBigInts(comments));
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
      include: {
        users: {
          select: {
            username: true
          }
        }
      }
    });

    if (parent_comment_id) {
      const parentComment = await prisma.comments.findUnique({
        where: { id: BigInt(parent_comment_id) }
      });

      if (parentComment && parentComment.user_id !== BigInt(session.user.id)) {
        await prisma.notification.create({
          data: {
            user_id: parentComment.user_id,
            article_id: BigInt(article_id),
            message: `${session.user.username} replied to your comment.`
          }
        });
      }
    }

    return NextResponse.json(serializeBigInts(newComment), { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}