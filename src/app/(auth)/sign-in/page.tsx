'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import {  useDebounceCallback } from 'usehooks-ts';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/Schemas/signUpSchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/apiResponse';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signInSchema } from '@/Schemas/signInSchema';
import { signIn } from 'next-auth/react';


const SignInPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
      const result = await signIn('credentials',{
        redirect: false,
        email:data.email,
        password: data.password,
       })
       if(result?.error){
        toast({
          title:'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive'
        })
       }

       if(result?.url){
        router.replace('/dashboard')
       }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">JOIN ANONY MESSAGE!</h1>
                    <p className="mb-4">Sign in to start your anonymous adventure!</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email/Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email/Username" {...field} />
                                    </FormControl>
                                    <FormDescription>Your email address for signing in.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormDescription>Choose a strong password.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                      register as a member?{' '}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
