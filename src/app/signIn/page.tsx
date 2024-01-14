'use client';
import {NextPage} from 'next';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import * as z from 'zod';

import {signIn} from 'next-auth/react';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button, buttonVariants} from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {Input} from '@/components/ui/input';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Link from 'next/link';

const formSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Username must be more than 3 characters'})
    .max(20, {message: 'Username must be less than 20 characters'}),
  password: z
    .string()
    .min(5, {message: 'Password must be more than 5 characters'})
    .max(50, {message: 'Password must be less than 50 characters'}),
});

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.has('error')) {
      setError(searchParams.get('error'));
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn('credentials', {
      username: values.username.toString(),
      password: values.password.toString(),
      redirect: true,
      callbackUrl: '/',
    });
    // form.reset();
  }

  return (
    <main className="w-full sm:w-[600px] px-4">
      <Card className="my-8">
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
                    {error ? (
                      <FormLabel className="text-destructive">Username</FormLabel>
                    ) : (
                      <FormLabel>Username</FormLabel>
                    )}

                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    {error ? (
                      <FormLabel className="text-destructive">Password</FormLabel>
                    ) : (
                      <FormLabel>Password</FormLabel>
                    )}
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-sm font-medium text-destructive">
                  Password or Username incorrect. Try again.
                </p>
              )}
              <Link
                href="/forgot-password"
                className={buttonVariants({variant: 'link'}) + ' text-sm'}
                style={{padding: '0'}}>
                Reset Password?
              </Link>
            </CardContent>
            <CardFooter>
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
};

export default Page;
