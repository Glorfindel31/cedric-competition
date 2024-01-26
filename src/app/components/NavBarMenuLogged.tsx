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
    <div className="w-full sm:w-[800px]">
      <nav className=" flex flex-row-reverse w-full px-4 sm:px-0 sm:w-[800px]">
        <ul className="flex flex-row-reverse gap-1 py-4 w-full  sm:w-[800px] sm:gap-4">
          <li>
            <ToggleDark />
          </li>
          <li>
            <Button
              size={'sm'}
              onClick={() => {
                signOut({callbackUrl: 'http://localhost:3000/'});
              }}>
              SignOut
            </Button>
          </li>
          {role === 'admin' ? (
            <li>
              <Button asChild variant={'secondary'} size={'sm'}>
                <Link href="/admin">Admin</Link>
              </Button>
            </li>
          ) : (
            <li>
              <Button asChild variant={'outline'} size={'sm'}>
                <Link href="/user">Events</Link>
              </Button>
            </li>
          )}
        </ul>
        <ul className="flex gap-1 py-4 w-full sm:gap-4">
          <li>
            <Button asChild variant={'outline'} size={'sm'}>
              <Link href="/" prefetch={false}>
                <HomeIcon />
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant={'outline'} size={'sm'}>
              <Link href="/dashboard">Ranking</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <Separator />
    </div>
  );
}
