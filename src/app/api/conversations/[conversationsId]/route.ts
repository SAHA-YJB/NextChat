import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismaDb';

interface IParam {
  conversationsId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParam }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await prisma.conversation.findMany({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('찾을 수 없습니다.', { status: 404 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });
    return NextResponse.json(deletedConversation);
  } catch (error) {
    return NextResponse.json(null);
  }
}
