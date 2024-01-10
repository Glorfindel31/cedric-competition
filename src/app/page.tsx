import {Separator} from '@/components/ui/separator';
import Image from 'next/image';
import kilter from '../../public/Kilter.jpg';
export default function Home() {
  return (
    <main className="w-full sm:w-[600px]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
        Kilterboard Event Maker
      </h1>
      <Separator className="my-4" />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        This is an open-source project where the admin will be able to create lists of
        problems on the Kilterboard.
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The admin will be able to create problems, and then the public will be able to
        climb them. Users will have to manually look for the problems on the Kilterboard
        app and log their ascents back in this app. Users will need an account on this app
        to participate.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        This is a friendly competitive event maker, and we believe that users will play
        fairly regarding the logs of problems.
      </blockquote>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        On the Dashboard, you will be able to see the ranking by gender. You will also be
        able to see the ranking per event and a general ranking.
      </p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-4">
        To start, register or sign in to your account.
      </h3>
      <Image src={kilter} alt="Kilterboard image" placeholder="blur" />
    </main>
  );
}
