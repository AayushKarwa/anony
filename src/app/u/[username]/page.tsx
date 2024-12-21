'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { messageSchema } from '@/Schemas/messageSchema';
import { ApiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { z } from 'zod';


const sendMessage = () => {
  const {toast} = useToast();
  const params = useParams<{username:string}>();
  const {username} = params;
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema)
  })
  const messageContent = form.watch('content');
  const [isLoading,setIsLoading] = useState(false);

  const onsubmit = async(data: z.infer<typeof messageSchema>) =>{
    setIsLoading(true);

    try {
     const response = await axios.post<ApiResponse>('/api/send-message',{
        username,
        content: data.content,
      })
      toast({
        title: 'Message sent',
        description: response.data.message
      })
      form.reset({ ...form.getValues(), content: '' });

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'failed to send message',
        description: 'user is not accepting messages',
        variant: 'destructive'
      })
    }finally{
      setIsLoading(false);
    }

  }

  return (
    <div className="container mx-auto my-8 max-w-4xl rounded bg-white p-6">
      <h1 className="mb-6 text-center text-4xl font-bold">Public Profile Link</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href="/sign-up">
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}

export default sendMessage;