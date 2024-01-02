import prisma from '@/libs/prismaDb';
import getCurrentUser from './getCurrentUser';

// 대화 아이디 가져오기
const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error) {
    return null;
  }
};

export default getConversationById;
