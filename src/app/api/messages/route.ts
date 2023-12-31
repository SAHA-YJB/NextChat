import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismaDb';
import { pusherServer } from '@/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 새 메시지 생성
    const newMessage = await prisma.message.create({
      // 리턴할 때 포함할 필드
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image,
        conversation: { connect: { id: conversationId } },
        seen: { connect: { id: currentUser.id } },
        sender: { connect: { id: currentUser.id } },
      },
    });
    // 채팅방 업데이트
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
      },
      include: {
        users: true,
        messages: { include: { seen: true } },
      },
    });
    // 클라이언트에게 응답 채널 / 이벤트 / 데이터 전송
    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
