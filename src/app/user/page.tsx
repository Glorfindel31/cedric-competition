import {options} from '../api/auth/[...nextauth]/options';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';

const Page = async ({}) => {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/signIn?callbackUrl=/user');
  }
  return (
    <div>
      <h1>{session.user.name} Welcome to your user page</h1>
      <h2>locked to one email - my</h2>
    </div>
  );
};

export default Page;
