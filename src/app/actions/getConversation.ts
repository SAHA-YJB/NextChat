import prisma from '@/libs/prismaDb';
import getCurrentUser from './getCurrentUser';

// 생성된 대화 가져오기
const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        // 현재 유저가 가지고 있는 대화들을 가져옴
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (error) {
    return [];
  }
};

export default getConversations;
