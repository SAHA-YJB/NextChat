// 채팅 디테일 페이지
import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/components/EmptyState';
import Body from './components/Body';
import Form from './components/Form';
import Header from './components/Header';

interface IParams {
  conversationId: string;
}

const ConversationIdpage = async ({ params }: { params: IParams }) => {
  // 메시지와 대화 정보를 가져옴
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  console.log('params', params);
  console.log('params.conversationId', params.conversationId);
  console.log('conversationIdpage', conversation, messages);

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
