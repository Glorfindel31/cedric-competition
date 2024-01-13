//ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import {DefaultSession, DefaultUser} from 'next-auth';
import {JWT, DefaultJWT} from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      name: string;
      id: string;
      role: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    name: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    name: string;
    role: string;
  }
}
