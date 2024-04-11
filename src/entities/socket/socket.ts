// socket.ts
import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;

export const initializeSocket = (url: string, subscriptions: Array<{topic: string, callback: (message: any) => void}>) => {
  stompClient = new Client({
    brokerURL: url,
    onConnect: () => {
      console.log('서버 연결');
      //주어진 리스트를 모두 구독
      subscriptions.forEach(({ topic, callback }) => {
        stompClient?.subscribe(topic, (message) => {
          callback(JSON.parse(message.body));
        });
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });

  stompClient.activate();
};

export const sendMessage = (destination: string, message: any) => {
  if (!stompClient) {
    console.error('STOMP client is not initialized.');
    return;
  }

  stompClient.publish({
    destination,
    body: JSON.stringify(message),
  });
};
