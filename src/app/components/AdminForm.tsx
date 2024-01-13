'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useForm, useFieldArray, Control} from 'react-hook-form';
import {useState, useEffect, useMemo} from 'react';
import {useToast} from '@/components/ui/use-toast';
import {getNewDate} from '@/lib/utils';

//ui
import {Form} from '@/components/ui/form';
//components
import AdminEventName from '@components/AdminEventName';
import AdminDateRange from '@components/AdminDateRange';
import AdminAngle from '@components/AdminAngle';
import AdminProblems from '@components/AdminProblems';
import AdminDialogCheck from '@components/AdminDialogCheck';

const formSchema = z.object({
  _id: z.string().optional(),
  eventName: z
    .string()
    .min(5, {
      message: 'Must be at least 5 characters.',
    })
    .max(100, {
      message: 'Must be at less than 100 characters.',
    }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  angle: z.number().refine(value => !isNaN(value), {
    message: 'Required to set a grade.',
  }),
  problems: z.array(
    z.object({
      name: z
        .string()
        .min(5, {
          message: 'Must be at least 5 characters.',
        })
        .max(200, {
          message: 'Must be at less than 200 characters.',
        }),
      grade: z.number().refine(value => !isNaN(value), {
        message: 'Required to set a grade.',
      }),
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

export interface AdminProblemsProps extends FormFieldProps {
  append: (value: any) => void; //
  remove: (index: number) => void;
  fields: any[];
  register: any;
}
export interface FormFieldProps {
  control?: Control<FormValues>;
  name: any;
}
export interface AdminFormProps {
  initialValues?: FormValues;
  id?: string;
}

export default function AdminForm({initialValues, id}: AdminFormProps) {
  const toast = useToast();
  const defaultValues = useMemo(
    () => ({
      eventName: '',
      angle: undefined,
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      problems: initialValues?.problems.length
        ? initialValues.problems
        : [{grade: undefined, name: ''}],
    }),
    [initialValues],
  );

  const [heldData, setHeldData] = useState<FormValues | null>(null);
  const {register, formState, reset, ...rest} = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: initialValues || defaultValues,
  });

  useEffect(() => {
    reset(initialValues || defaultValues);
  }, [reset, initialValues, defaultValues]);

  const {fields, append, remove} = useFieldArray({
    name: 'problems',
    control: rest.control,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => setHeldData(data);

  const handlePost = async (data: any) => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error('Failed to submit', await response.text());
      toast.toast({
        title: 'Failed to submit',
        description: `Failed to submit event. ${getNewDate()}`,
      });
    } else {
      toast.toast({
        title: 'Submitted Successfully',
        description: `Your event has been successfully submitted. ${getNewDate()}`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleUpdate = async (data: any, id: string) => {
    const response = await fetch(`/api/events?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error('Failed to submit', await response.text());
      toast.toast({
        title: 'Failed to update',
        description: `Failed to update event. ${getNewDate()}`,
      });
    } else {
      toast.toast({
        title: 'Updated Successfully',
        description: `Your event has been successfully updated. ${getNewDate()}`,
      });
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000);
    }
  };

  return (
    <Form {...{register, formState, reset, ...rest}}>
      <form onSubmit={rest.handleSubmit(onSubmit)} className="space-y-8">
        <AdminEventName control={rest.control} name={'eventName'} />
        <AdminDateRange name={'dateRange'} />
        <AdminAngle control={rest.control} name={'angle'} />
        <AdminProblems
          control={rest.control}
          name={'problems'}
          fields={fields}
          append={append}
          remove={remove}
          register={register}
        />
        <AdminDialogCheck
          initialValues={initialValues}
          heldData={heldData}
          handlePost={handlePost}
          id={id}
          handleUpdate={handleUpdate}
          formIsValid={formState.isValid}
          resetForm={reset}
        />
      </form>
    </Form>
  );
}
