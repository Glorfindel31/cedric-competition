import {Separator} from '@/components/ui/separator';
import AdminForm from '@/components/AdminForm';

const testData = {
  _id: '6586737bd52904ef4aade082',
  eventName: 'Event 01',
  dateRange: {
    from: '2023-12-22T16:39:21.329Z',
    to: '2023-12-22T17:00:00.000Z',
  },
  angle: 40,
  problems: [
    {
      name: 'problem 01',
      grade: 0,
    },
    {
      name: 'problem 02',
      grade: 1,
    },
    {
      name: 'problem 03',
      grade: 2,
    },
    {
      name: 'problem 04',
      grade: 3,
    },
    {
      name: 'problem 05',
      grade: 4,
    },
    {
      name: 'problem 06',
      grade: 5,
    },
    {
      name: 'problem 07',
      grade: 6,
    },
    {
      name: 'problem 08',
      grade: 7,
    },
    {
      name: 'problem 09',
      grade: 8,
    },
    {
      name: 'problem 10',
      grade: 9,
    },
  ],
};

const transformData = {
  ...testData,
  dateRange: {
    from: new Date(testData.dateRange.from),
    to: new Date(testData.dateRange.to),
  },
};

const Page = ({params}: {params: {eventId: string}}) => {
  return (
    <main className="w-full sm:w-[600px] px-4">
      <h1 className="text-4xl font-bold tracking-tight my-8">Welcome Back Admin!</h1>
      <Separator className="my-4" />
      <h2 className="text-2xl font-bold tracking-tight my-8">Event: {params.eventId}</h2>
      <AdminForm initialValues={transformData} />
      <Separator className="my-4" />
    </main>
  );
};

export default Page;
