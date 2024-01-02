'use client';
import { Toaster } from 'react-hot-toast';

// 클라이언트 컴포넌트에서만 토스터를 사용할 수 있기에 래핑
// 전체 레이아웃을 감싸는 용도
const ToasterContext = () => {
  return <Toaster />;
};

export default ToasterContext;
