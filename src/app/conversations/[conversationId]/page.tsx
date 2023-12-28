import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/components/EmptyState';
import Body from './components/Body';
import Header from './components/Header';
import Form from './components/Form';

interface IParams {
  conversationId: string;
}

const ConversationIdpage = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='flex flex-col h-full'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='lg:pl-80 h-full'>
      <div className='flex flex-col h-full'>
        <Header conversation={conversation} />
        <Body initMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationIdpage;
