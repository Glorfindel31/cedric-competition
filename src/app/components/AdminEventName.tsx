'use client';
import {Input} from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {FormFieldProps} from '@components/AdminForm';
export default function AdminEventName({control, name}: FormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>Event Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Your event name"
              {...field}
              value={String(field.value)}
              ref={null}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
