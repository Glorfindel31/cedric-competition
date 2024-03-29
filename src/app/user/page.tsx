import {options} from '../api/auth/[...nextauth]/options';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
import {prisma} from '@/lib/prisma';
import {Separator} from '@/components/ui/separator';
import UserEventsList from '@/components/UserEventsList';
import Main from '@/components/ui/main';

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

  if (userData) {
    userData.password = '';
  }
  const event_data = await prisma.events_list.findMany();
  return (
    <Main>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {session.user.name}
      </h1>{' '}
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        Welcome to your personal space. Don&apos;t worry it&apos;s your safe space...
      </blockquote>
      <Separator className="my-4" />
      <UserEventsList data={event_data} user={userData} />
    </Main>
  );
};

export default Page;
