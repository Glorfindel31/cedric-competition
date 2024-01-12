import {ObjectId} from 'mongodb';
import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const prisma = new PrismaClient();

async function POST(request: any) {
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
    if (existingEmail) {
      return NextResponse.json({error: 'Email already exists'}, {status: 500});
    }
    if (existingUsername) {
      return NextResponse.json({error: 'Username already exists'}, {status: 500});
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return NextResponse.json({error: err}, {status: 500});
      }
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
    });
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

export {POST};
