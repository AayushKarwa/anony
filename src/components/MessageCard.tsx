'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { ApiResponse } from '@/types/apiResponse';
import { Message } from '@/model/User';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      if (typeof message._id !== 'string') {
        throw new Error('Message ID is not a string');
      }

      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);

      toast({
        title: response.data.message,
      });
      onMessageDelete(message._id);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to delete the message.',
      });
    }
  };

  const createdAt = message.createdAt ? new Date(message.createdAt).toDateString() : '';

  return (
    <Card className="card-bordered bg-sky-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{message.content || 'No Content Available'}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <X className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">{createdAt}</div>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
