'use client';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const params = useParams();

  // usememo를 사용해 밑 함수의 리턴값을 리턴함
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }
    return params.conversationId;
  }, [params?.conversationId]);

  // 불 값으로 할당하기 위해 !!를 사용함
  const isOpen = !!conversationId;

  return { conversationId, isOpen };
};

export default useConversation;
