'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, useFieldArray} from 'react-hook-form';
import {useState} from 'react';
import * as z from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {Plus, Minus} from 'lucide-react';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import React from 'react';

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
        {/* EVENT NAME FEILD */}
        <FormField
          control={rest.control}
          name="eventName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Your event name" {...field} ref={null} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DATE RANGE FEILD */}
        <FormField
          name="dateRange"
          render={({field}) => (
            <FormItem>
              <FormLabel>Date Range</FormLabel>
              <FormControl>
                <div className={cn('grid gap-2')}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                          'w-[300px] justify-start text-left font-normal',
                          !field && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={selectedDateRange => {
                          field.onChange(selectedDateRange);
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ANGLE INPUT FEILD */}
        <FormField
          control={rest.control}
          name="angle"
          render={({field}) => (
            <FormItem>
              <FormLabel>Select angle</FormLabel>
              <FormControl>
                <div id="angle" className="mb-4">
                  <Select onValueChange={value => field.onChange(Number(value))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Angle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20°</SelectItem>
                      <SelectItem value="25">25°</SelectItem>
                      <SelectItem value="30">30°</SelectItem>
                      <SelectItem value="35">35°</SelectItem>
                      <SelectItem value="40">40°</SelectItem>
                      <SelectItem value="45">45°</SelectItem>
                      <SelectItem value="50">50°</SelectItem>
                      <SelectItem value="55">55°</SelectItem>
                      <SelectItem value="60">60°</SelectItem>
                      <SelectItem value="65">65°</SelectItem>
                      <SelectItem value="70">70°</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={rest.control}
          name="problems"
          render={({field}) => (
            <FormItem>
              <FormLabel>Problems</FormLabel>
              <FormControl>
                <div className="flex flex-col">
                  {fields.map((fieldItem, index) => (
                    <div
                      key={fieldItem.id}
                      className="flex flex-row items-center gap-2 mb-2"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={event => {
                          event.preventDefault();
                          append({name: '', grade: 0});
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={index === 0} // Disable the button for the first field
                        onClick={event => {
                          event.preventDefault();
                          if (index > 0) {
                            // Only remove the field if it's not the first one
                            remove(index);
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        {...register(`problems.${index}.name`)}
                        type="text"
                        placeholder="In app problem name"
                      />
                      <FormField
                        name={`problems.${index}.grade`}
                        control={rest.control}
                        defaultValue={0}
                        render={({field}) => (
                          <Select
                            {...field}
                            value={field.value.toString()}
                            onValueChange={value => {
                              field.onChange(Number(value));
                            }}
                          >
                            <SelectTrigger className="w-[80px]">
                              <SelectValue placeholder="Grade V Scale" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">V0</SelectItem>
                              <SelectItem value="1">V1</SelectItem>
                              <SelectItem value="2">V2</SelectItem>
                              <SelectItem value="3">V3</SelectItem>
                              <SelectItem value="4">V4</SelectItem>
                              <SelectItem value="5">V5</SelectItem>
                              <SelectItem value="6">V6</SelectItem>
                              <SelectItem value="7">V7</SelectItem>
                              <SelectItem value="8">V8</SelectItem>
                              <SelectItem value="9">V9</SelectItem>
                              <SelectItem value="10">V10</SelectItem>
                              <SelectItem value="11">V11</SelectItem>
                              <SelectItem value="12">V12</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                {holdedData?.problems.map((problem, index) => (
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
      </form>
    </Form>
  );
}
