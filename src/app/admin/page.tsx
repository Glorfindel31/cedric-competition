import {Separator} from '@/components/ui/separator';
import {NextPage} from 'next';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <main className="w-full sm:w-[640px]">
      <h1>Hello Admin</h1>
      <Separator />
    </main>
  );
};

export default Page;
