import { withAuth } from 'next-auth/middleware';

// 이 미들웨어는 사용자가 인증/권한이 있는지 확인
// 권한이 없다면, 로그인 페이지로 리디렉션
export default withAuth({
  pages: {
    signIn: '/',
  },
});

export const config = {
  // 로그인된 유저만 접근가능 아니면 로그인페이지
  matcher: ['/conversatons/:path*', '/users/:path*'],
};
