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
    <Table className="w-full text-xs sm:text-sm">
      <TableHeader>
        <TableRow className="border-b border-primary bg-secondary text-sm ">
          <TableHead className="w-1/2 py-4 px-2 font-extrabold">Problem Name</TableHead>
          <TableHead className="w-1/6 text-center py-4 px-2 font-extrabold">
            V Grade
          </TableHead>
          <TableHead className="w-1/6 text-center py-4 px-2 font-extrabold">
            Status
          </TableHead>
          <TableHead className="w-1/6 text-center py-4 px-2 font-extrabold">
            Register
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventData.problems.map((problem: any, index: any) => {
          const isTop = userTopList.some((top: any) => top.problem === problem.name);
          isTop ? (totalPoints += problem.grade + 1) : null;
          return (
            <TableRow key={`${eventData.id}-${index}`}>
              <TableCell className="w-1/2 font-medium p-2">{problem.name}</TableCell>
              <TableCell className="w-1/6 text-center p-2">V{problem.grade}</TableCell>
              <TableCell className="w-1/6 text-center p-2">
                {isTop ? 'Top' : 'No Top'}
              </TableCell>
              <TableCell className="w-1/6 text-right p-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {isTop ? (
                      <Button disabled variant="outline" size={'sm'}>
                        Log Ascent
                      </Button>
                    ) : (
                      <Button variant="outline" size={'sm'}>
                        Log Ascent
                      </Button>
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
