import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

// 세션 정보를 가져오는 함수
export default async function getSession() {
  return await getServerSession(authOptions);
}
