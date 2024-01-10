'use client';
import ToggleDark from '@/components/ui/ToggleDark';
import {Button} from './ui/button';
import {signOut} from 'next-auth/react';
import {Separator} from '@/components/ui/separator';

export default function NavBarMenuLogged() {
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
            }}
          >
            SignOut
          </Button>
        </li>
      </ul>
      <Separator />
    </nav>
  );
}
