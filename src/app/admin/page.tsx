import {options} from '../api/auth/[...nextauth]/options';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
import {Separator} from '@/components/ui/separator';
import AdminForm from '@/components/AdminForm';
import AdminProblemsList from '@components/AdminProblemsList';
import Main from '@components/ui/main';

const Page = async ({}) => {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/signIn?callbackUrl=/admin');
  }
  return (
    <Main>
      <h1 className="text-4xl font-bold tracking-tight my-8">
        Welcome Back {session?.user.name}
      </h1>
      <AdminForm />
      <Separator className="my-4" />
      <AdminProblemsList />
    </Main>
  );
};

export default Page;
