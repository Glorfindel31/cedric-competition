import type {NextAuthOptions} from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
        password: {label: 'Password', type: 'password', placeholder: '********'},
      },
      async authorize(credentials) {
        const admin = {
          id: '1',
          name: 'Cedric',
          email: 'cedric31flo@gmail.com',
          username: 'admin',
          role: 'admin',
          password: '123456789',
        };
        if (
          credentials?.username === admin.username &&
          credentials?.password === admin.password
        ) {
          return admin;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
    signOut: '/signOut',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/register', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
