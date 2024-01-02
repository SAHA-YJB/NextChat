import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// 클라이언트에서 환경변수 사용시 NEXT_PUBLIC_을 붙임.
// 서버사이드에서 환경변수 사용시 NEXT_PUBLIC_을 안 붙임

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'ap3',
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax',
    },
    cluster: 'ap3',
  }
);

// 1. 채널에 구독
// 2. 채널에 이벤트 리스너 바인딩
// 3. 이벤트 발생시 콜백함수 실행
// 4. 채널 구독 해제 / 바인딩 해제
