import prisma from '@/libs/prismaDb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // 이메일과 비밀번호로 로그인
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // signIn 메소드 호출 시 authorize 실행
      async authorize(credentials) {
        // 이메일과 비밀번호가 없으면 에러 쓰로우
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 확인해주세요.');
        }
        // 이메일로 유저 찾기
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        // 유저가 없거나 비밀번호가 없으면 에러 쓰로우
        if (!user || !user.hashedPassword) {
          throw new Error('다시 시도해주세요.');
        }
        // 비밀번호 체크
        // compare 함수를 사용하여 비밀번호가 일치하는지 확인
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user.hashedPassword
        );
        // 비밀번호가 일치하지 않으면 에러 쓰로우
        if (!isCorrectPassword) {
          throw new Error('비밀번호를 확인해주세요.');
        }
        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

// 라우트파일이기 때문에 get, post로 내보냄
export { handler as GET, handler as POST };
