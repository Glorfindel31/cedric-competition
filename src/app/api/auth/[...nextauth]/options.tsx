import type {NextAuthOptions} from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import {GithubProfile} from 'next-auth/providers/github';
// import {GoogleProfile} from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {authIn} from '@/lib/auth';

export const options: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   profile(profile: GithubProfile) {
    //     // console.log(profile);
    //     return {
    //       ...profile,
    //       role: profile.role ?? 'user',
    //       id: profile.id.toString(),
    //     };
    //   },
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // }),
    // GoogleProvider({
    //   profile(profile: GoogleProfile) {
    //     // console.log(profile);
    //     return {
    //       ...profile,
    //       role: profile.role ?? 'user',
    //       id: profile.id.toString(),
    //     };
    //   },
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'username'},
        password: {label: 'Password', type: 'password', placeholder: '********'},
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const user = await authIn(credentials.username, credentials.password);
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({token, user}) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({session, token}) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.name = token.name;
      }
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
