'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useForm, useFieldArray, Control} from 'react-hook-form';
import {useState} from 'react';
//ui
import {Form} from '@/components/ui/form';
//componants
import AdminEventName from '@components/AdminEventName';
import AdminDateRange from '@components/AdminDateRange';
import AdminAngle from '@components/AdminAngle';
import AdminProblems from '@components/AdminProblems';
import AdminDialogCheck from '@components/AdminDialogCheck';

const formSchema = z.object({
  eventName: z
    .string()
    .min(2, {
      message: 'Must be at least 2 characters.',
    })
    .max(100, {
      message: 'Must be at less than 100 characters.',
    }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  angle: z.number(),
  problems: z.array(
    z.object({
      name: z
        .string()
        .min(2, {
          message: 'Must be at least 2 characters.',
        })
        .max(200, {
          message: 'Must be at less than 200 characters.',
        }),
      grade: z.number(),
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

export default function AdminForm() {
  const [holdedData, setHoldedData] = useState<FormValues | null>(null);
  const {register, ...rest} = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      eventName: '',
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      angle: 0,
      problems: [
        {
          name: '',
          grade: 0,
        },
      ],
    },
  });

  const {fields, append, remove} = useFieldArray({
    name: 'problems',
    control: rest.control,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => setHoldedData(data);

  return (
    <Form {...{register, ...rest}}>
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
        <AdminDialogCheck holdedData={holdedData} />
      </form>
    </Form>
  );
}
