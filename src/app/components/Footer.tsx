import Link from 'next/link';
import {Separator} from '@/components/ui/separator';
import Image from 'next/image';
import logo from '/public/logo.png';
import version from '@/lib/version';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full my-4 px-4 sm:w-[800px] sm:p-0">
      <Separator className="mb-4" />
      <div className="flex gap-2 items-center">
        <div className="flex items-center bg-secondary rounded p-1">
          <Image src={logo} alt="vietclimbs logo" width={80} height={80} />
        </div>
        <p className="leading-4 text-xs text-muted-foreground sm:text-sm">
          Created by Cedric Florentin
          <br />
          Open-source project run on Next.js 13 and MongoDB.
          <br />
          Powered by{' '}
          <Link
            className="font-bold hover:underline underline-offset-4 text-primary"
            href="https://www.vietclim.vn/">
            Vietclimb.{' '}
          </Link>
          Check out the source code on{' '}
          <Link
            className="font-bold hover:underline underline-offset-4 text-primary"
            href="https://github.com/Glorfindel31/cedric-competition">
            Github
          </Link>{' '}
          <br />
          Follow me on{' '}
          <Link
            className="font-bold hover:underline underline-offset-4 text-primary"
            href="https://www.instagram.com/bored_on_boards/">
            Instagram
          </Link>{' '}
          Version : {version}
        </p>
      </div>
    </footer>
  );
}
