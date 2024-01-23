'use client';
import ToggleDark from '@/components/ui/ToggleDark';
import {Button} from './ui/button';
import {signOut} from 'next-auth/react';
import {Separator} from '@/components/ui/separator';
import {HomeIcon} from '@radix-ui/react-icons';
import Link from 'next/link';

interface NabBarMenuLoggedProps {
  role: string;
}

export default function NavBarMenuLogged({role}: NabBarMenuLoggedProps) {
  return (
    <div className="sm:w-[600px]">
      <nav className="sm:w-[600px] flex flex-row-reverse">
        <ul className="flex flex-row-reverse gap-4 py-4 w-full">
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
              <Button asChild variant={'outline'}>
                <Link href="/admin">Admin</Link>
              </Button>
            </li>
          ) : (
            <li>
              <Button asChild variant={'outline'}>
                <Link href="/user">My Account</Link>
              </Button>
            </li>
          )}
        </ul>
        <ul className="flex gap-4 py-4 w-full">
          <li>
            <Button asChild variant={'outline'}>
              <Link href="/">
                <HomeIcon />
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant={'outline'}>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <Separator />
    </div>
  );
}
