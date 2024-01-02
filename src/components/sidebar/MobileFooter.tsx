'use client';
import useConversation from '@/hooks/useConversation';
import useRoutes from '@/hooks/useRoutes';
import React from 'react';
import MobileItem from './MobileItem';

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  // conversastion id가 존재하는 경우에는 null을 반환
  if (isOpen) {
    return null;
  }

  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
      {routes.map((item) => (
        <MobileItem
          key={item.href}
          href={item.href}
          active={item.active}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
