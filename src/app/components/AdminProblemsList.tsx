import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AdminRemoveUpdateDialog from './AdminRemoveUpdateDialog';
import {prisma} from '@/lib/prisma';

const AdminProblemsList = async () => {
  const data = await prisma.events_list.findMany();
  return (
    <Accordion type="single" collapsible>
      {data.map((event: any, index: number) => (
        <AccordionItem key={index} value={event.eventName}>
          <AccordionTrigger>
            {event.eventName} - from:{' '}
            {new Date(event.dateRange.from).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}{' '}
            to:{' '}
            {new Date(event.dateRange.to).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </AccordionTrigger>
          <AccordionContent>
            <AdminRemoveUpdateDialog eventId={event.id} />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Problem Name</TableHead>
                  <TableHead className="text-right">Grade (V Scale)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.problems.map((problem: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{problem.name}</TableCell>
                    <TableCell className="text-right">{problem.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AdminProblemsList;
