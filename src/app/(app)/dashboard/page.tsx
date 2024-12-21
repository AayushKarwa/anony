import { useToast } from '@/hooks/use-toast';
import { Message } from '@/model/User'
import { acceptMessage } from '@/Schemas/acceptMessageSchema';
import { ApiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const dashboard = () => {
  const [message, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);

  const {toast} = useToast();

  const handleDeleteMessage = async(messageId:string) =>{
    setMessage(message.filter((msg)=>msg._id !== messageId));
  }
  const {data: session} = useSession();

  const form = useForm<z.infer<typeof acceptMessage>>({
    resolver: zodResolver(acceptMessage),
  })

  const {register, watch, setValue} = form;

  const acceptMessageValue = watch('acceptMessage');

  const fetchAcceptMessage = useCallback(async()=>{
    setIsSwitchLoading(true);

    try {
    const response =  await axios.get<ApiResponse>('/api/accept-messages')
    setValue('acceptMessage', response.data?.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      return toast({
        title: 'Error',
        description: axiosError?.response?.data?.message || 'Failed to fetch message acceptance status',
        variant: 'destructive'
      })
    }finally{
      setIsSwitchLoading(false);
    }
  },[setValue])

  const fetchMessages = useCallback(async(refresh: boolean = false)=>{
    setIsLoading(true);
    try {
     const response = await axios.get<ApiResponse>('/api/get-messages')

     setMessage(response.data.messages || [])
     if(refresh){
      toast({
        title: 'Refreshed Messages',
        description: 'showing latest messages',

      })
     }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      return toast({
        title: 'Error',
        description: axiosError?.response?.data?.message || 'Failed to fetch message latest messages',
        variant: 'destructive'
      })
    }finally{
      setIsLoading(false);
    }
    }
  ,[setIsLoading,setMessage])

  useEffect(()=>{
    if(!session?.user) return;
    fetchMessages();
    fetchAcceptMessage();
  },[session,fetchMessages,fetchAcceptMessage,setValue])
  return (
    <div>dashboard</div>
  )
}

export default dashboard