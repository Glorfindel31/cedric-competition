import {NextPage} from 'next';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Main from '@/components/ui/main';
import Image from 'next/image';
import logo from '@/../../public/myLogo.png';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <Main>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
          ACCESS DENIED
        </h1>
        <div
          className="overflow-hidden relative"
          style={{width: '400px', height: '280px'}}>
          <Image src={logo} alt="My Logo" fill objectFit="cover" />
        </div>
        <h3 className="scroll-m-20 text-2xl">
          Your are logged in but you do not have access to this page.
        </h3>
        <div className="flex flex-row gap-4 justify-end">
          <Button asChild variant={'secondary'}>
            <Link href={'/'}>Back Home</Link>
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default Page;
