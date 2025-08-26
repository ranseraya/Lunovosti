import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get('author_id');

    const follow = await prisma.follow.findUnique({
        where: {
            follower_id_following_id: {
                follower_id: BigInt(session.user.id),
                following_id: BigInt(authorId),
            },
        },
    });
    return NextResponse.json({ following: !!follow });
}


export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { author_id } = await request.json();
    if (!author_id) return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });

    const existingFollow = await prisma.follow.findUnique({
        where: {
            follower_id_following_id: {
                follower_id: BigInt(session.user.id),
                following_id: BigInt(author_id),
            },
        },
    });

    if (existingFollow) {
        await prisma.follow.delete({ where: { id: existingFollow.id } });
        return NextResponse.json({ following: false, message: 'Unfollowed author' });
    } else {
        await prisma.follow.create({
            data: {
                follower_id: BigInt(session.user.id),
                following_id: BigInt(author_id),
            },
        });

        await prisma.notification.create({
            data: {
                user_id: BigInt(author_id),
                message: `${session.user.name || session.user.email} started following you.`,
                type: 'FOLLOW',
            },
        });
        return NextResponse.json({ following: true, message: 'Followed author' });
    }
}