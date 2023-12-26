import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { HiChat } from 'react-icons/hi';
import { HiUsers, HiArrowLeftOnRectangle } from 'react-icons/hi2';
import useConversation from './useConversation';

// 사이드바 메뉴 라우팅경로
const useRoutes = () => {
  const pathName = usePathname();
  const { isOpen, conversationId } = useConversation();

  const routes = [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      active: pathName === '/conversations' || isOpen,
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: pathName === '/users',
    },
    {
      label: 'Logout',
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle,
      active: pathName === '/users',
    },
  ];
  return routes;
};

export default useRoutes;
