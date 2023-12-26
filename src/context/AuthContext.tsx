'use client';
import { SessionProvider } from 'next-auth/react';

export interface AuthContextProps {
  children: React.ReactNode;
}

// 클라이언트 컴포넌트에서만 세션프로바이더를 사용할 수 있기에 래핑
// 레이아웃을 감싸는 용도
const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
