'use client';
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

type Props = {
  eventData: any;
  userId: string;
  gender: 'male' | 'female' | 'other';
};

export default function UserEventJoinTable(props: Props) {
  const {eventData, userId, gender} = props;
  const participantList = eventData[gender + 'Participants'];
  const userParticipant = participantList.find(
    (participant: any) => participant.user_id === userId,
  );
  const userTopList = userParticipant ? userParticipant.top_list : [];

  return (
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
        {eventData.problems.map((problem: any, index: any) => {
          const isTop = userTopList.some((top: any) => top.problem === problem.name);
          return (
            <TableRow key={`${eventData.id}-${index}`}>
              <TableCell className="w-1/2 font-medium py-1">{problem.name}</TableCell>
              <TableCell className="w-1/6 text-center py-1">V{problem.grade}</TableCell>
              <TableCell className="w-1/6 text-center py-1">
                {isTop ? 'Top' : 'No Top'}
              </TableCell>
              <TableCell className="w-1/6 text-right py-1">
                <Button>Log Accent</Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Points</TableCell>
          <TableCell className="text-right">0</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
