import {Separator} from '@/components/ui/separator';
import AdminForm from '@/components/AdminForm';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const Page = async ({params}: {params: {eventId: string}}) => {
  const dataPrisma = await prisma.events_list.findUnique({
    where: {
      id: params.eventId,
    },
  });
  console.log(dataPrisma);
  if (!dataPrisma) {
    return <div>No event found</div>;
  }
  const dateMutation = (input: any) => {
    return {
      ...input,
      dateRange: {
        from: new Date(input.dateRange.from),
        to: new Date(input.dateRange.to),
      },
    };
  };
  const data = dateMutation(dataPrisma);
  return (
    <main className="w-full sm:w-[600px] px-4">
      <h1 className="text-4xl font-bold tracking-tight my-8">Welcome Back Admin!</h1>
      <Separator className="my-4" />
      <h2 className="text-2xl font-bold tracking-tight my-8">Event: {params.eventId}</h2>
      <AdminForm initialValues={data} id={params.eventId} />
      <Separator className="my-4" />
    </main>
  );
};

export default Page;
