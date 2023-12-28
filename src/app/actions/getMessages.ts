import prisma from '@/libs/prismaDb';

// 메시지들 가져오기
const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessages;
