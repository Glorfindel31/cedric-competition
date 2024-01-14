import {options} from '../api/auth/[...nextauth]/options';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
import {Separator} from '@/components/ui/separator';
import AdminForm from '@/components/AdminForm';
import AdminProblemsList from '@components/AdminProblemsList';

const Page = async ({}) => {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/signIn?callbackUrl=/admin');
  }
  return (
    <main className="w-full sm:w-[600px] px-4">
      <h1 className="text-4xl font-bold tracking-tight my-8">
        Welcome Back {session?.user.name}
      </h1>
      <AdminForm />
      <Separator className="my-4" />
      <AdminProblemsList />
    </main>
  );
};

export default Page;
