// socket.ts
import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;

//TODO: 소켓의 위치 지정

export const initializeSocket = (url: string, subscriptions: Array<{topic: string, callback: (message: any) => void}>) => {
  stompClient = new Client({
    brokerURL: url,
    reconnectDelay: 5000,
    onConnect: () => {
      //주어진 리스트를 모두 구독
      console.log('소켓 연결됨 ')
      subscriptions.forEach(({ topic, callback }) => {
        console.log('소켓 시도중 '+topic)
        stompClient?.subscribe(topic, (message) => {
          callback(JSON.parse(message.body));
        });
      });
    },
    onStompError: (frame) => {
      console.log('소켓 연결 끊김 ')
      console.error('Error!: ' + frame.headers['message']);
      console.error(frame.body);
    },
    
    debug: (str) => {
      console.log(str);
    },
    
  });

  stompClient.activate();
  
  return stompClient;
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
