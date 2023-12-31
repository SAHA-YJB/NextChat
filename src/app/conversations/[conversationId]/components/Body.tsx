'use client';
import useConversation from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import { FullMessageType } from '@/types';
import axios from 'axios';
import { find } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';

interface BodyProps {
  initMessages: FullMessageType[];
}

const Body = ({ initMessages }: BodyProps) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    // conversationId 이 채널에 구독
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
    // 바인딩하기 - 이벤트가 오면 함수 호출
    pusherClient.bind('messages:new', messageHandler);

    return () => {
      // 메모리 누수 방지
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
    };
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          data={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div className='pt-24' ref={bottomRef} />
    </div>
  );
};

export default Body;
