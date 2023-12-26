import prisma from '@/libs/prismaDb';
import getSession from './getSession';

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    return console.log('현재 유저를 찾을 수 없습니다.');
  }
};

export default getCurrentUser;
