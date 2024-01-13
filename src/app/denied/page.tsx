import {NextPage} from 'next';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <main className="w-full sm:w-[600px] flex flex-col gap-8 px-4 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
        ACCESS DENIED
      </h1>
      <h3 className="scroll-m-20 text-2xl">
        Your are logged in but you do not have access to this page.
      </h3>
      <div className="flex flex-row gap-4 justify-end">
        <Button asChild variant={'secondary'}>
          <Link href={'/'}>Back Home</Link>
        </Button>
      </div>
    </main>
  );
};

export default Page;
