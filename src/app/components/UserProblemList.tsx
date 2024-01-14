'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';

const dateMod = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('vn-VN', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

export default function UserProblemList({data}: any) {
  if (!data) return null;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Event Date</TableHead>
          <TableHead className="text-right">Register</TableHead>
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
            <TableCell className="text-right">
              <Button>Register</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
