// ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import {withAuth, NextRequestWithAuth} from 'next-auth/middleware';
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({token}) => token?.role === 'admin',
    },
  },
);

export const config = {matcher: ['/admin', '/users']};
