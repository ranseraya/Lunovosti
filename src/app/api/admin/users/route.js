import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { serializeBigInts } from '@/app/utils/serialize';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role.toUpperCase() !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const users = await prisma.users.findMany({
            select: { id: true, username: true, email: true, role: true, created_at: true },
            orderBy: { created_at: 'desc' },
        });
        return NextResponse.json(serializeBigInts(users));
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role.toUpperCase() !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const { userId, newRole } = await request.json();
        const updatedUser = await prisma.users.update({
            where: { id: BigInt(userId) },
            data: { role: newRole },
        });
        return NextResponse.json(serializeBigInts(updatedUser));
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}