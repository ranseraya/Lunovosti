import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role.toUpperCase() !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const totalArticles = await prisma.articles.count();
        const totalUsers = await prisma.users.count();
        const pendingArticles = await prisma.articles.count({
            where: { status: 'pending_review' },
        });
        const totalLikes = await prisma.like.count();

        const stats = {
            totalArticles,
            totalUsers,
            pendingArticles,
            totalLikes
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}