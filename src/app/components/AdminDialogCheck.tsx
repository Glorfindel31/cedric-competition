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

export default function AdminDialogCheck({holdedData}: {holdedData: any}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Please check the information below before submitting.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h3>Name: {holdedData?.eventName}</h3>
          <h3>Angle: {holdedData?.angle}°</h3>
          <h3>Problems:</h3>
          <ul>
            {holdedData?.problems.map((problem: any, index: any) => (
              <li key={index}>
                {problem.name} - {problem.grade}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={event => {
                console.log(holdedData);
              }}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
