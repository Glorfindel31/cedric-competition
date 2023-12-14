'use client';
import {Button, Container, Flex} from '@radix-ui/themes';
import Link from 'next/link';
import ToggleBtn from './ToggleBtn';

export default function NavBar() {
  return (
    <nav>
      <Flex gap="3" align="center" className=" border-b py-4 mx-4">
        <Link href="/login" passHref>
          <Button variant="soft">Login</Button>
        </Link>
        <Link href="/register" passHref>
          <Button variant="soft">Register</Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button variant="soft">Dashboard</Button>
        </Link>
        <ToggleBtn />
      </Flex>
    </nav>
  );
}
