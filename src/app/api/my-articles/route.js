import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { serializeBigInts } from '@/app/utils/serialize';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const authorProfile = await prisma.authors.findUnique({
            where: { user_id: BigInt(session.user.id) }
        });

        if (!authorProfile) {
            return NextResponse.json([]);
        }

        const articles = await prisma.articles.findMany({
            where: { author_id: authorProfile.id },
            include: { authors: true, categories: true },
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json(serializeBigInts(articles));
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}