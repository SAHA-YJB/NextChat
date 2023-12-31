'use client';
import useConversation from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import { FullMessageType } from '@/types';
import axios from 'axios';
import { find } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';

const Body = ({ initMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    pusherClient.bind('messages:new', messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
    };
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div className='pt-24' ref={bottomRef} />
    </div>
  );
};

export default Body;
