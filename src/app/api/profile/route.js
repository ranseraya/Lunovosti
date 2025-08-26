import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '../../../libs/prisma';
import { serializeBigInts } from '@/app/utils/serialize';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    const userProfile = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        authors: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(serializeBigInts(userProfile));
  } catch (error) {
    console.error("Error while fetching data profile:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}