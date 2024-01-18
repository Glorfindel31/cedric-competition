import {prisma} from '@lib/prisma';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';

const Page = async ({
  params,
  searchParams,
}: {
  params: {slug: string};
  searchParams: {user: string};
}) => {
  const eventId = params.slug;
  const userId = searchParams.user;

  const event = await prisma.events_list.findUnique({
    where: {
      id: eventId,
    },
  });
  if (!event) {
    return <div>Event not found</div>;
  }

  const user = await prisma.users_list.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return <div>User not found</div>;
  } else {
    user.password = '';
  }

  const isEventRegistered = await prisma.users_list.count({
    where: {
      AND: [
        {
          id: userId,
        },
        {
          events_list: {
            some: {
              id: eventId,
            },
          },
        },
      ],
    },
  });
  if (isEventRegistered === 0) {
    const response = await prisma.users_list.update({
      where: {
        id: userId,
      },
      data: {
        events_list: {
          id: eventId,
          eventName: event.eventName,
          problems: event.problems.map(problem => ({
            name: problem.name,
            grade: problem.grade,
            top: false,
          })),
        },
      },
    });
    console.log(response);
  } else {
    const userEvent = user.events_list.find(event => event.id === eventId);
    return userEvent;
  }

  return (
    <main className="w-full sm:w-[600px] p-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 uppercase">
        {event.eventName}
      </h2>
      <Table>
        <TableCaption>Register you Accents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 p-4">Problem Name</TableHead>
            <TableHead className="w-1/6 text-center p-4">V Grade</TableHead>
            <TableHead className="w-1/6 text-center p-4">Status</TableHead>
            <TableHead className="w-1/6 text-center p-4">Register</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {event.problems.map((problem, index) => (
            <TableRow key={index}>
              <TableCell className="w-1/2 font-medium py-1">{problem.name}</TableCell>
              <TableCell className="w-1/6 text-center py-1">V{problem.grade}</TableCell>
              <TableCell className="w-1/6 text-center py-1">No Top</TableCell>
              <TableCell className="w-1/6 text-right py-1">
                <Button>Log Accent</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Points</TableCell>
            <TableCell className="text-right">0</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
};

export default Page;
