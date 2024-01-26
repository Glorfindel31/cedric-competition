import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcrypt';

const saltRounds = 10;

async function POST(request: NextRequest) {
  try {
    const {email, password, role, username, gender} = await request.json();

    if (!email || !password || !role || !username || !gender)
      return NextResponse.json({error: 'Missing required fields'}, {status: 500});

    const [existingEmail, existingUsername] = await Promise.all([
      prisma.users_list.findUnique({where: {email: email}}),
      prisma.users_list.findUnique({where: {username: username}}),
    ]);

    if (existingEmail?.email === email || existingUsername?.username === username) {
      return NextResponse.json(
        {
          error:
            existingEmail?.email === email
              ? 'Email already exists'
              : 'Username already exists',
        },
        {status: 400},
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
