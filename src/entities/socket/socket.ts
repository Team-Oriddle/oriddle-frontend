// socket.ts
import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;

//TODO: 소켓의 위치 지정

export const initializeSocket = (url: string, subscriptions: Array<{topic: string, callback: (message: any) => void}>) => {
  stompClient = new Client({
    brokerURL: url,
    onConnect: () => {
      //주어진 리스트를 모두 구독
      console.log('소켓 시도중 ')
      subscriptions.forEach(({ topic, callback }) => {
        console.log('소켓 시도중 '+topic)
        stompClient?.subscribe(topic, (message) => {
          callback(JSON.parse(message.body));
        });
      });
    },
    onStompError: (frame) => {
      console.log('소켓 안됨 ')

      console.error('Error!: ' + frame.headers['message']);
      console.error(frame.body);
    },
  });
  console.log('이미 지나감')

  stompClient.activate();
};

export const sendMessage = (destination: string, message: any) => {
  if (!stompClient) {
    console.error('STOMP client가 연결되어있지 않습니다.');
    return;
  }

  stompClient.publish({
    destination,
    body: JSON.stringify(message),
  });
};
