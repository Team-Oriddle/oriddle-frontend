// socket.ts
import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;

//TODO: 추후에 백엔드에서 연결끊김에 처리에 따라서 연결 끊김에 대한 처리 필요함
export const initializeSocket = (url: string) => {
  stompClient = new Client({
    brokerURL: url,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('소켓 연결됨 ')
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
