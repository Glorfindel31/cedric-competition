import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import Image from 'next/image';
import logo from '/public/Vietclimb - Logo 2022.png';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full sm:w-[600px] my-4">
      <Separator className="my-4" />
      <div className="flex flex-row gap-4 items-center">
        <div className="flex items-center bg-white rounded-full p-2">
          <Image src={logo} alt="vietclimbs logo" width={100} height={100} />
        </div>
        <p className="leading-7 text-sm text-muted-foreground w-full">
          Created by Cedric Florentin | Open-source project run on Next.js 13 and MongoDB.
          <br />
          Powered by{' '}
          <Link
            className={buttonVariants({variant: 'link'})}
            href="https://www.vietclim.vn/"
          >
            Vietclimb
          </Link>
          <br />
          Check out the source code on{' '}
          <Link
            className={buttonVariants({variant: 'link'})}
            href="https://github.com/Glorfindel31/cedric-competition"
          >
            Github
          </Link>{' '}
          - Follow me on{' '}
          <Link
            className={buttonVariants({variant: 'link'})}
            href="https://www.instagram.com/bored_on_boards/"
          >
            Instagram
          </Link>
        </p>
      </div>
    </footer>
  );
}
