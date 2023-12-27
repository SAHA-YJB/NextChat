'use client';
import useConversation from '@/hooks/useConversation';
import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';

interface ConversationListProps {
  users: User[];
  initItems: FullConversationType[];
  title?: string;
}

const ConversationList = ({ users, initItems }: ConversationListProps) => {
  const [items, setItems] = useState(initItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, conversationId } = useConversation();

  return (
    <aside
      className={clsx(
        `fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
      border-gray-200`,
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
    >
      <div className='px-5'>
        <div className='flex justify-between pt-4 mb-4'>
          <div className='text-2xl font-bold text-neutral-800'>채팅 앱</div>
          <div
            onClick={() => setIsModalOpen(true)}
            className='p-2 text-gray-600 transition bg-gray-100 rounded-full cursor-pointer hover:opacity-75'
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {/* {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))} */}
      </div>
    </aside>
  );
};

export default ConversationList;