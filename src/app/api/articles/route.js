import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { serializeBigInts } from '@/app/utils/serialize';
import { slugify } from '@/app/utils/helper';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const articles = await prisma.articles.findMany({
      include: { authors: true, categories: true },
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(serializeBigInts(articles));
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const { title, content, excerpt, category_id, author_id } = data;
    const userRole = session.user.role.toUpperCase();

    if (!title || !content || !category_id || !author_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let status = 'draft';
    if ((userRole === 'EDITOR' || userRole === 'ADMIN') && data.status === 'published') {
      status = 'published';
    }

    const newArticle = await prisma.articles.create({
      data: {
        title,
        slug: slugify(title) + `-${Date.now()}`,
        content,
        excerpt,
        category_id: parseInt(category_id),
        author_id: parseInt(author_id),
        status,
        published_at: status === 'published' ? new Date() : null,
      },
    });

    if (newArticle.status === 'published') {
      const author = await prisma.authors.findUnique({
        where: { id: newArticle.author_id },
      });

      if (author && author.user_id) {
        const followers = await prisma.follow.findMany({
          where: { following_id: author.user_id },
          select: { follower_id: true }
        });

        if (followers.length > 0) {
          const notifications = followers.map(f => ({
            user_id: f.follower_id,
            article_id: newArticle.id,
            message: `${author.name} published a new article: "${newArticle.title}"`,
            type: 'NEW_ARTICLE',
          }));

          await prisma.notification.createMany({
            data: notifications,
          });
        }
      }
    }

    return NextResponse.json(serializeBigInts(newArticle), { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}