'use client';
import {Button} from '@/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
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

type AdminDialogCheckProps = {
  id?: string;
  heldData: any;
  formIsValid: boolean;
  initialValues: any;
  resetForm: () => void;
  handlePost: (data: any) => void;
  handleUpdate: (data: any, id: string) => Promise<void>;
};

const AdminDialogCheck: React.FC<AdminDialogCheckProps> = ({
  heldData,
  formIsValid,
  resetForm,
  handlePost,
  initialValues,
  handleUpdate,
  id,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Double check before submitting</DialogTitle>
        </DialogHeader>
        <Table>
          <TableCaption>
            Problems List for <strong>{heldData?.eventName}</strong> | Please double check
            before submitting
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Problems Names</TableHead>
              <TableHead className="text-right">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heldData?.problems.map((problem: any, index: any) => (
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
            {initialValues ? (
              <Button
                onClick={() => {
                  id && handleUpdate(heldData, id);
                }}
                disabled={!formIsValid}>
                Submit
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handlePost(heldData);
                  resetForm();
                }}
                disabled={!formIsValid}>
                Submit P
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDialogCheck;
