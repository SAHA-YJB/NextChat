import { FullConversationType } from '@/types';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

// 채팅방에서 본인을 제외한 상대방 정보를 가져오는 훅
const useOtheruser = (conversation: FullConversationType) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    // useMemo를 사용하여 함수의 값을 리턴
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    // 여러명의 유저 중 첫번째 유저를 리턴
    return otherUser[0];
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtheruser;
