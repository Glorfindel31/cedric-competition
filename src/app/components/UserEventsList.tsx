import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {prisma} from '@lib/prisma';
import Link from 'next/link';

const dateMod = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('vn-VN', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

export default async function UserEventsList({data, user}: any) {
  const isDateOk = (date: any) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const from = new Date(new Date(date.from).toISOString());
    from.setHours(0, 0, 0, 0);
    const to = new Date(new Date(date.to).toISOString());
    to.setHours(0, 0, 0, 0);
    return now >= from && now <= to;
  };
  if (!data) return null;
  //need to create an api route for this because the call is made from the client side
  const isEventRegistered = await prisma.users_list.count({
    where: {
      id: user.id,
      events_list: {
        every: {
          id: data.id,
        },
      },
    },
  });

  const handleRegisterEvent = async () => {
    if (isEventRegistered > 0) {
      const userUpdate = await prisma.users_list.update({
        where: {
          id: user.id,
        },
        data: {
          events_list: {
            id: data.id,
            eventName: data.eventName,
            problems: {},
          },
        },
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Event Date</TableHead>
          <TableHead className="text-right">Join the event</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="uppercase">{item.eventName}</TableCell>
            <TableCell>
              From: {dateMod(item.dateRange.from)}
              <br /> to: {dateMod(item.dateRange.to)}
            </TableCell>
            {isDateOk(item.dateRange) ? (
              <TableCell className="text-right">
                <Button asChild variant="outline">
                  <Link
                    onClick={handleRegisterEvent}
                    href={`user/eventJoin/${item.id}?user=${user.id}`}>
                    Join
                  </Link>
                </Button>
              </TableCell>
            ) : (
              <TableCell className="text-right">
                <Button variant="outline" disabled>
                  Join
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
