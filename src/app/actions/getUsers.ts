import prisma from '@/libs/prismaDb';
import getSession from './getSession';

// 유저 목록 가져오기
const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      // 내림차순
      orderBy: {
        createdAt: 'desc',
      },
      // 내가 아닌 다른 사람들만 가져오기
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};

export default getUsers;
