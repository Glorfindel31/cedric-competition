import Link from 'next/link';
import {Separator} from '@/components/ui/separator';
import Image from 'next/image';
import logo from '/public/logo.png';
import version from '@/lib/version';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full sm:w-[600px] my-4">
      <Separator className="flex flex-row gap-4 items-center my-4" />
      <div className="flex flex-row gap-4 items-center">
        <div className="flex items-center bg-white rounded-full p-2">
          <Image src={logo} alt="vietclimbs logo" width={100} height={100} />
        </div>
        <p className="leading-5 text-sm text-muted-foreground w-full">
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
