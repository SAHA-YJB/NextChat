'use client';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from '@prisma/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import Avatar from '@/components/Avartar';
import useOtherUser from '@/hooks/useOtheruser';
import AvatarGroup from '@/components/AvartarGroup';
import { FullConversationType } from '@/types';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  // 상대방 정보 가져오기
  const otherUser = useOtherUser(data);
  // 로그인한 사용자 정보 가져오기
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  // useMemo를 사용해서 마지막 메시지를 가져옴
  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  // 본 사람 확인
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  // 마지막 메시지 텍스트 가져오기
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return '사진';
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return '대화를 시작했습니다.';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        mb-3
        `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar currentUser={otherUser} />
      )}
      <div className='flex-1 min-w-0'>
        <div className='focus:outline-none'>
          <span className='absolute inset-0' aria-hidden='true' />
          <div className='flex items-center justify-between mb-1'>
            <p className='font-medium text-gray-900 text-md'>
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className='text-xs font-light text-gray-400 '>
                {/* p = 오전 오후인 문자열 반환 */}
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
