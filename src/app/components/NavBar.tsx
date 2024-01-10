import {getServerSession} from 'next-auth';
import {options} from '@/api/auth/[...nextauth]/options';

import NavBarMenuLogged from '@/components/NavBarMenuLogged';
import NavBarMenuPublic from '@/components//NavBarMenuPublic';
export default async function NavBar() {
  const session = await getServerSession(options);

  return session ? <NavBarMenuLogged /> : <NavBarMenuPublic />;
}
