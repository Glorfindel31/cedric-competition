'use client';
import ToggleDark from '@/components/ui/ToggleDark';
import {Button} from './ui/button';
import {signOut} from 'next-auth/react';
import {Separator} from '@/components/ui/separator';
import Link from 'next/link';

interface NabBarMenuLoggedProps {
  role: string;
}

export default function NavBarMenuLogged({role}: NabBarMenuLoggedProps) {
  return (
    <nav className="w-full sm:w-[600px]">
      <ul className="flex flex-row-reverse gap-4 py-4">
        <li>
          <ToggleDark />
        </li>
        <li>
          <Button
            onClick={() => {
              signOut({callbackUrl: 'http://localhost:3000/'});
            }}>
            SignOut
          </Button>
        </li>
        {role === 'admin' ? (
          <li>
            <Button asChild variant={'secondary'}>
              <Link href="/admin">Admin</Link>
            </Button>
          </li>
        ) : (
          <li>
            <Button asChild variant={'secondary'}>
              <Link href="/user">My Account</Link>
            </Button>
          </li>
        )}
      </ul>
      <Separator />
    </nav>
  );
}
