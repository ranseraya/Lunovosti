import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

const serializeBigInts = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

  try {
    const notifications = await prisma.notification.findMany({
      where: { user_id: BigInt(session.user.id) },
      orderBy: { created_at: 'desc' },
      take: 10,
      include: {
        article: {
            select: {
                slug: true
            }
        }
      }
    });
    return NextResponse.json(serializeBigInts(notifications));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT() {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await prisma.notification.updateMany({
        where: { 
            user_id: BigInt(session.user.id),
            read: false 
        },
        data: { read: true },
      });
      return NextResponse.json({ message: 'Notifications marked as read' });
    } catch (error) {
      console.error("Error updating notifications:", error);
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
  }