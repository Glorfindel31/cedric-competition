import {User} from 'next-auth';
import {prisma} from '@/lib/prisma';

import {compare} from 'bcrypt';

type SignInFn = (username: string, password: string) => Promise<User | null>;

export const authIn: SignInFn = async (username, password) => {
  const user = await prisma.users_list.findUnique({
    where: {
      username: username,
    },
  });
  if (user && (await compare(password, user.password))) {
    user.password = '';
    return {
      ...user,
      name: user.username,
    };
  } else throw new Error('Invalid username or password');
};
