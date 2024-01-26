'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useToast} from '@/components/ui/use-toast';
import {getNewDate} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import Main from '@components/ui/main';

import * as z from 'zod';
import {EyeOpenIcon, EyeClosedIcon} from '@radix-ui/react-icons';
import {Checkbox} from '@/components/ui/checkbox';
import {useState} from 'react';
import {signIn} from 'next-auth/react';

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, {message: 'Username must be more than 3 characters'})
      .max(20, {message: 'Username must be less than 20 characters'}),
    password: z
      .string()
      .min(5, {message: 'Password must be more than 5 characters'})
      .max(50, {message: 'Password must be less than 50 characters'}),
    confirmPassword: z.string().min(5).max(50),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    gender: z.enum(['male', 'female', 'other'], {
      errorMap: () => {
        return {message: 'Please select a gender'};
      },
    }),
    isVerified: z.boolean().optional(),
  })
  .superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export default function Page({}) {
  const {toast} = useToast();
  const [isToggledPass, setIsToggledPass] = useState(true);
  const [isToggledCon, setIsToggledCon] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      role: 'user',
      password: '',
      confirmPassword: '',
      gender: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to register', errorData);
        toast({
          title: 'Failed to register',
          description: errorData.error,
        });
      } else {
        const successData = await response.json();
        console.log('Registration successful', successData);
        toast({
          title: 'Registered Successfully',
          description:
            'Your account has been successfully registered. ' +
            'Registered at: ' +
            getNewDate(),
        });
        await signIn('credentials', {
          username: values.username.toString(),
          password: values.password.toString(),
          redirect: true,
          callbackUrl: '/user',
        });
      }
    } catch (error) {
      console.error('Error during registration', error);
      toast({
        title: 'Error during registration',
        description: 'An error occurred while trying to register. Please try again.',
      });
    }
  }

  return (
    <Main>
      <Card className="my-8">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Enter your UserName and Password</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your username" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-4">
                        <Input
                          type={isToggledPass ? 'password' : 'text'}
                          placeholder="********"
                          {...field}
                        />
                        <div className="flex flex-col justify-between items-center">
                          {isToggledPass ? <EyeClosedIcon /> : <EyeOpenIcon />}
                          <Checkbox onClick={() => setIsToggledPass(!isToggledPass)} />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-4">
                        <Input
                          type={isToggledCon ? 'password' : 'text'}
                          placeholder="********"
                          {...field}
                        />
                        <div className="flex flex-col justify-between items-center">
                          {isToggledCon ? <EyeClosedIcon /> : <EyeOpenIcon />}
                          <Checkbox onClick={() => setIsToggledCon(!isToggledCon)} />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['male', 'female', 'other'].map(value => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The gender selected will be used to determine your competitive
                      category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Register</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </Main>
  );
}
