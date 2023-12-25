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

const getList = async () => {
  const response = await fetch('http://localhost:3000/api/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
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

const dataExample = [
  {
    _id: '6585bc8c341fcd75b534c85a',
    eventName: 'my first event test',
    dateRange: {from: '2023-12-22T16:39:21.329Z', to: '2023-12-22T17:00:00.000Z'},
    angle: 40,
    problems: [
      {name: 'problem 01', grade: 0},
      {name: 'problem 02', grade: 1},
      {name: 'problem 03', grade: 2},
      {name: 'problem 04', grade: 3},
      {name: 'problem 05', grade: 4},
    ],
  },
  {
    _id: '6585bd2b341fcd75b534c85b',
    eventName: 'my second event',
    dateRange: {from: '2023-12-22T17:00:00.000Z', to: '2023-12-23T17:00:00.000Z'},
    angle: 35,
    problems: [
      {name: "problem 01 '?> &&& ### ee😇", grade: 7},
      {name: 'probke', grade: 1},
      {name: 'jehjbfhjb', grade: 5},
      {name: 'jknhrfbherb', grade: 6},
    ],
  },
  {
    _id: '6585c1bb341fcd75b534c85c',
    eventName: 'test one the lost',
    dateRange: {from: '2023-12-22T16:57:53.810Z', to: '2023-12-22T17:00:00.000Z'},
    angle: 35,
    problems: [
      {name: 'bhnhjnhbjh', grade: 0},
      {name: 'jjhbsdhjfbsjhdfbhj', grade: 1},
      {name: 'kjfdvhnvfhdhf', grade: 2},
      {name: 'jjfhbhsdjbbsdhjfshbjh', grade: 3},
      {name: 'sfhbnysufbhnsbhn', grade: 4},
      {name: 'hnbghnihbhnhnjhbnj', grade: 5},
      {name: 'nuwiefwuiehfuwi', grade: 6},
      {name: 'ewqfwqefqwef', grade: 7},
      {name: 'qefqwefqwefwqefwq', grade: 8},
      {name: 'eqqwerwqerwqe', grade: 9},
      {name: 'eqwrfavfsdvf', grade: 10},
      {name: 'adsagfweafafewr', grade: 11},
      {name: 'addafsfasdfrg', grade: 12},
    ],
  },
];
