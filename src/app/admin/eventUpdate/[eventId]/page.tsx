import {Separator} from '@/components/ui/separator';
import AdminForm from '@/components/AdminForm';

async function getEvent(eventId: string) {
  const response = await fetch(`http://localhost:3000/api/events?eventId=${eventId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();

  if (data.dateRange) {
    data.dateRange.from = new Date(data.dateRange.from);
    data.dateRange.to = new Date(data.dateRange.to);
  }

  return data;
}

const Page = async ({params}: {params: {eventId: string}}) => {
  const data = await getEvent(params.eventId);

  return (
    <main className="w-full sm:w-[600px] px-4">
      <h1 className="text-4xl font-bold tracking-tight my-8">Welcome Back Admin!</h1>
      <Separator className="my-4" />
      <h2 className="text-2xl font-bold tracking-tight my-8">Event: {params.eventId}</h2>
      <AdminForm initialValues={data} />
      <Separator className="my-4" />
    </main>
  );
};

export default Page;
