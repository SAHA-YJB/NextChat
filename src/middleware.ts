import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/',
  },
});

export const config = {
  // 로그인된 유저만 접근가능 아니면 로그인페이지
  matcher: ['/conversatons/:path*', '/users/:path*'],
};
