import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { serializeBigInts } from '@/app/utils/serialize';

// Cek status bookmark
export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('article_id');
    
    if (articleId) {
        const bookmark = await prisma.bookmark.findUnique({
            where: {
                user_id_article_id: {
                    user_id: BigInt(session.user.id),
                    article_id: BigInt(articleId),
                },
            },
        });
        return NextResponse.json({ bookmarked: !!bookmark });
    }

    // Ambil semua artikel yang di-bookmark oleh pengguna
    const bookmarks = await prisma.bookmark.findMany({
        where: { user_id: BigInt(session.user.id) },
        include: { article: { include: { categories: true } } },
        orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(serializeBigInts(bookmarks));
}

// Tambah atau hapus bookmark
export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { article_id } = await request.json();
    if (!article_id) return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });

    const existingBookmark = await prisma.bookmark.findUnique({
        where: {
            user_id_article_id: {
                user_id: BigInt(session.user.id),
                article_id: BigInt(article_id),
            },
        },
    });

    if (existingBookmark) {
        await prisma.bookmark.delete({ where: { id: existingBookmark.id } });
        return NextResponse.json({ bookmarked: false, message: 'Bookmark removed' });
    } else {
        const newBookmark = await prisma.bookmark.create({
            data: {
                user_id: BigInt(session.user.id),
                article_id: BigInt(article_id),
            },
        });
        return NextResponse.json({ bookmarked: true, message: 'Bookmark added', data: serializeBigInts(newBookmark) });
    }
}