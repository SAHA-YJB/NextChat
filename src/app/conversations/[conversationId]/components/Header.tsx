'use client';
import Avartar from '@/components/Avartar';
import AvatarGroup from '@/components/AvartarGroup';
import useActiveList from '@/hooks/useActiveList';
import useOtheruser from '@/hooks/useOtheruser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // 대화방에서 상대방 데이터 가져오기
  const otherUser = useOtheruser(conversation);
  const { members } = useActiveList();
  //상대방이 온라인인지 아닌지 확인
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} 명`;
    }
    return isActive ? '온라인' : '오프라인';
  }, [conversation, isActive]);

  return (
    <div 
      className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'
    >
      <div className='flex items-center gap-3'>
        <Link
          href={'/conversations'}
          className='className="block text-orange-500 transition cursor-pointer lg:hidden hover:text-orange-600"'
        >
          <HiChevronLeft size={32} />
        </Link>
        {conversation.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avartar currentUser={otherUser} />
        )}
        <div className='flex flex-col'>
          <div>{conversation.name || otherUser.name}</div>
          <div className='text-sm font-light text-neutral-500'>
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => setDrawerOpen(true)}
        className='text-blue-500 transition cursor-pointer hover:text-blue-600'
      />
    </div>
  );
};

export default Header;
