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
import {getNewDate} from '@/lib/utils';
import {useToast} from '@/components/ui/use-toast';
import Link from 'next/link';

export default function AdminRemoveUpdateDialog(eventId: any) {
  const {toast} = useToast();
  const handleRemove = async () => {
    const response = await fetch(`/api/events?id=${eventId.eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast({
        title: 'Event Removed Successfully',
        description: `${errorData} at ${getNewDate()}`,
      });
      throw new Error('Something went wrong!');
    } else {
      toast({
        title: 'Event Removed Successfully',
        description: `${eventId.eventName} has been remove the ${getNewDate()}`,
      });
      window.location.reload();
    }
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
              }}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Link
        className={buttonVariants({variant: 'secondary'})}
        href={`/admin/eventUpdate/${eventId.eventId}`}>
        Update
      </Link>
    </div>
  );
}
