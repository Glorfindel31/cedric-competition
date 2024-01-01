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

const MAX_RETRIES = 5;

const getList = async () => {
  let retries = 0;
  let response;

  while (retries < MAX_RETRIES) {
    try {
      response = await fetch('http://localhost:3000/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      if (response && !response.ok) {
        throw new Error('Something went wrong!');
      }

      // If the request was successful, break the loop
      break;
    } catch (error) {
      // If the request failed, increment the retry counter
      retries++;
      console.error(`Attempt ${retries} failed. Retrying...`);
    }
  }

  if (retries === MAX_RETRIES) {
    throw new Error('Failed to fetch data after multiple attempts');
  }

  return response?.json();
};

const AdminProblemsList = async () => {
  const data: any[] = await getList();
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
            <AdminRemoveUpdateDialog eventId={event._id} />
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
