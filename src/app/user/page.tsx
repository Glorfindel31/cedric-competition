import {options} from '../api/auth/[...nextauth]/options';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
import {prisma} from '@/lib/prisma';
import {Separator} from '@/components/ui/separator';
import UserProblemList from '@/components/UserProblemList';
import {log} from 'console';

const Page = async ({}) => {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/signIn?callbackUrl=/user');
  }
  const userData = await prisma.users_list.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const event_data = await prisma.events_list.findMany();

  return (
    <main className="w-full sm:w-[600px] p-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {session.user.name}
      </h1>{' '}
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        Welcome to your user page
      </blockquote>
      <Separator className="my-4" />
      <UserProblemList data={event_data} />
    </main>
  );
};

export default Page;
