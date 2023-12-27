import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import getConversations from '../actions/getConversation';
import getUsers from '../actions/getUsers';
import ConversationList from './components/ConversationList';

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const users = await getUsers();
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList
          users={users}
          title='Messages'
          initItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
