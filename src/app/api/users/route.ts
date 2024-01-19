import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcrypt';

const saltRounds = 10;

async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {email, password, role, username, gender} = body;

    const existingEmail = await prisma.users_list.findUnique({
      where: {
        email: email,
      },
    });

    const existingUsername = await prisma.users_list.findUnique({
      where: {
        username: username,
      },
    });

    if (existingEmail || existingUsername) {
      return NextResponse.json(
        {error: existingEmail ? 'Email already exists' : 'Username already exists'},
        {status: 500},
      );
    }

    const hash = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });

    const result = await prisma.users_list.create({
      data: {
        email: email,
        password: hash,
        role: role,
        username: username,
        gender: gender,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

export {POST};
