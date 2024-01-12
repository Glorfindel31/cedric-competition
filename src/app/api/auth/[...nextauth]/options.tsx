import type {NextAuthOptions} from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {GithubProfile} from 'next-auth/providers/github';
import {GoogleProfile} from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        // console.log(profile);
        return {
          ...profile,
          role: profile.role ?? 'user',
          id: profile.id.toString(),
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        // console.log(profile);
        return {
          ...profile,
          role: profile.role ?? 'user',
          id: profile.id.toString(),
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'username'},
        password: {label: 'Password', type: 'password', placeholder: '********'},
      },
      async authorize(credentials) {
        //remember that it is here where you will have to get the data from mongoDB
        const admin = {
          id: '01',
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
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({token, user}) {
      if (user) token.role = user.role;
      return token;
    },
    async session({session, token}) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/signIn',
    signOut: '/signOut',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/register', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
