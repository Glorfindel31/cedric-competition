'use client';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminDialogCheck({
  holdedData,
  formIsValid,
}: {
  holdedData: any;
  formIsValid: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Double check before submitting</DialogTitle>
        </DialogHeader>
        <Table>
          <TableCaption>
            Problems List for <strong>{holdedData?.eventName}</strong> | Please double
            check before submitting
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Problems Names</TableHead>
              <TableHead className="text-right">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdedData?.problems.map((problem: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{problem.name}</TableCell>
                <TableCell className="text-right">V{problem.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={event => {
                console.log(holdedData);
              }}
              disabled={!formIsValid}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
