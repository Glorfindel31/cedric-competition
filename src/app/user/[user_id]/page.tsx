import {NextPage} from 'next';

interface Params {
  user_id: string;
}

interface Props {
  params: Params;
}

const Page: NextPage<Props> = ({params}) => {
  const {user_id} = params;
  return (
    <div>
      <h1>[USER_ID] Welcome to your page Page</h1>
      <h2>locked to one email - my</h2>
    </div>
  );
};

export default Page;
