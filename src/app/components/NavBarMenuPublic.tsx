'use client';
import Link from 'next/link';
import ToggleDark from '@/components/ui/ToggleDark';
import {Button} from './ui/button';
import {Separator} from '@/components/ui/separator';
import {HomeIcon} from '@radix-ui/react-icons';

export default function NavBarMenuPublic() {
  return (
    <div className="w-full sm:w-[800px]">
      <nav className=" flex flex-row-reverse w-full px-4 sm:px-0 sm:w-[800px]">
        <ul className="flex flex-row-reverse gap-1 py-4 w-full  sm:w-[800px] sm:gap-4">
          <li>
            <ToggleDark />
          </li>
          <li>
            <Button variant="secondary" asChild size={'sm'}>
              <Link href="/register">Register</Link>
            </Button>
          </li>
          <li>
            <Button asChild size={'sm'}>
              <Link href="/signIn">SignIn</Link>
            </Button>
          </li>
        </ul>
        <ul className="flex gap-1 py-4 w-full sm:gap-4">
          <li>
            <Button asChild variant={'outline'} size={'sm'}>
              <Link href="/">
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
