import {NextPage} from 'next';
import {Separator} from '@/components/ui/separator';
import AdminForm from '@/components/AdminForm';
import AdminProblemsList from '@components/AdminProblemsList';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <main className="w-full sm:w-[600px] px-4">
      <h1 className="text-4xl font-bold tracking-tight my-8">Welcome Back Admin!</h1>
      <Separator className="my-4" />
      <AdminForm />
      <Separator className="my-4" />
      <AdminProblemsList />
    </main>
  );
};

export default Page;
