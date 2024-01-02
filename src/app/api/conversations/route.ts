import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismaDb';
import { pusherServer } from '@/libs/pusher';
import { NextResponse } from 'next/server';

// 대화생성 API
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }
    // 기존의 채팅방이 있는지 확인
    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          { userIds: { equals: [currentUser.id, userId] } },
          { userIds: { equals: [userId, currentUser.id] } },
        ],
      },
    });

    const singleConversation = existingConversation[0];
    // 이미 생성된 채팅방이 있으면 그냥 넘겨주기
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }
    // 없으면 새로 생성
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          // 현재 유저와 선택한 유저를 연결
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
