import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const data = await request.json();
        const { username, email, password } = data;

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password can't be empty" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [{ email: email }, { username: username }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email or username has been used' },
                { status: 409 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.users.create({
            data: {
                username: username,
                email: email,
                password_hash: hashedPassword,
                role: 'subscriber',
            },
        });

        const { password_hash, ...userWithoutPassword } = newUser;
        const safeUser = {
            ...userWithoutPassword,
            id: userWithoutPassword.id.toString(),
        };
        return NextResponse.json(safeUser, { status: 201 });

    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json(
            { error: 'An error occurded on the server' },
            { status: 500 }
        );
    }
}