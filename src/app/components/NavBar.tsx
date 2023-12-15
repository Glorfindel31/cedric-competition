import Link from 'next/link';
import ToggleDark from '@/components/ui/ToggleDark';
import {Button} from './ui/button';
import {Separator} from '@/components/ui/separator';

export default function NavBar() {
  return (
    <nav className="w-full sm:w-[600px]">
      <ul className="flex flex-row-reverse gap-4 py-4">
        <li>
          <ToggleDark />
        </li>
        <li>
          <Button variant="secondary" asChild>
            <Link href="/">Admin</Link>
          </Button>
        </li>
        <li>
          <Button variant="secondary" asChild>
            <Link href="/">Register</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/">Login</Link>
          </Button>
        </li>
      </ul>
      <Separator />
    </nav>
  );
}
