'use client';
import {useToast} from '@/components/ui/use-toast';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';

type Props = {
  eventData: any;
  userId: string;
  gender: 'male' | 'female' | 'other';
};

export default function UserEventJoinTable(props: Props) {
  const toast = useToast();
  const {eventData, userId, gender} = props;
  const participantList = eventData[gender + 'Participants'];
  const userParticipant = participantList.find(
    (participant: any) => participant.user_id === userId,
  );
  const userTopList = userParticipant ? userParticipant.top_list : [];
  let totalPoints = 0;

  const handleRegister = async (problemName: string, grade: number) => {
    try {
      const response = await fetch('/api/events/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemName: problemName,
          userId: userId,
          eventId: eventData.id,
          grade: grade,
          gender: gender,
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      toast.toast({
        title: 'Problem Registered',
        description: `You have successfully registered for ${problemName}`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

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
          isTop ? (totalPoints += problem.grade) : null;
          return (
            <TableRow key={`${eventData.id}-${index}`}>
              <TableCell className="w-1/2 font-medium py-1">{problem.name}</TableCell>
              <TableCell className="w-1/6 text-center py-1">V{problem.grade}</TableCell>
              <TableCell className="w-1/6 text-center py-1">
                {isTop ? 'Top' : 'No Top'}
              </TableCell>
              <TableCell className="w-1/6 text-right py-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {isTop ? (
                      <Button disabled variant="outline">
                        Log Ascent
                      </Button>
                    ) : (
                      <Button variant="outline">Log Ascent</Button>
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        No Dab - No fake start?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRegister(problem.name, problem.grade)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Points</TableCell>
          <TableCell className="text-right">{totalPoints}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}