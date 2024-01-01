'use client';
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
import {Button, buttonVariants} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import Link from 'next/link';

export default function AdminRemoveUpdateDialog(eventId: any) {
  const handleRemove = async () => {
    const response = await fetch(`/api/events?id=${eventId.eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    } else {
      window.location.reload();
    }
  };
  const {toast} = useToast();
  const getNewDate = () => {
    let date = new Date();
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  return (
    <div className="flex flex-row-reverse gap-4 w-full">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Remove</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the Event and
              remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleRemove();
                toast({
                  title: 'Event Removed Successfully',
                  description: `${eventId.eventName} has been remove the ${getNewDate()}`,
                });
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Link
        className={buttonVariants({variant: 'secondary'})}
        href={`/admin/eventUpdate/${eventId.eventId}`}
      >
        Update
      </Link>
    </div>
  );
}
