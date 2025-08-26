import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { serializeBigInts } from '@/app/utils/serialize';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('article_id');
    if (!articleId) return NextResponse.json({ error: 'Article ID required' }, { status: 400 });

    const session = await getServerSession(authOptions);

    const likeCount = await prisma.like.count({ where: { article_id: BigInt(articleId) } });

    if (!session) {
        return NextResponse.json({ count: likeCount, liked: false });
    }

    const userLike = await prisma.like.findUnique({
        where: {
            user_id_article_id: {
                user_id: BigInt(session.user.id),
                article_id: BigInt(articleId),
            },
        },
    });

    return NextResponse.json({ count: likeCount, liked: !!userLike });
}


export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { article_id } = await request.json();
    if (!article_id) return NextResponse.json({ error: 'Article ID required' }, { status: 400 });

    const existingLike = await prisma.like.findUnique({
        where: {
            user_id_article_id: {
                user_id: BigInt(session.user.id),
                article_id: BigInt(article_id),
            },
        },
    });

    if (existingLike) {
        await prisma.like.delete({ where: { id: existingLike.id } });
        const count = await prisma.like.count({ where: { article_id: BigInt(article_id) } });
        return NextResponse.json({ liked: false, count, message: 'Like removed' });
    } else {
        await prisma.like.create({
            data: {
                user_id: BigInt(session.user.id),
                article_id: BigInt(article_id),
            },
        });
        const count = await prisma.like.count({ where: { article_id: BigInt(article_id) } });
        return NextResponse.json({ liked: true, count, message: 'Like added' });
    }
}