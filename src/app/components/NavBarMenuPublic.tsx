'use client';
import Link from 'next/link';
import ToggleDark from '@/components/ui/ToggleDark';
import {Button} from './ui/button';
import {Separator} from '@/components/ui/separator';
import {HomeIcon} from '@radix-ui/react-icons';

export default function NavBarMenuPublic() {
  return (
    <div className="sm:w-[600px]">
      <nav className="sm:w-[600px] flex flex-row-reverse">
        <ul className="flex flex-row-reverse gap-4 py-4 w-full">
          <li>
            <ToggleDark />
          </li>
          <li>
            <Button variant="secondary" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/signIn">SignIn</Link>
            </Button>
          </li>
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
