// socket.ts
import { Client } from 'stompjs';

let stompClient: Client | null = null;

export const initializeSocket = (url: string) => {
  stompClient = new Client({
    brokerURL: url,// 연결을 진행항 url
    // connectHeaders: {
    //   login: 'user',
    //   passcode: 'password',
    // }, 로그인 관련 부분 관련 X
    // debug: function (str) {
    //   console.log('STOMP: ' + str);
    // }, 디버깅 설정
    // reconnectDelay: 5000,
    // heartbeatIncoming: 4000,
    // heartbeatOutgoing: 4000,
  });
  console.log('소켓 생성')
  stompClient.activate();
};

export const subscribeToMessages = (topic: string, callback: (message: any) => void) => {
  if (!stompClient) {
    console.error('STOMP client is not initialized.');
    return;
  }

  stompClient.onConnect = () => {
    stompClient?.subscribe(topic, (message) => {
      if (message.body) {
        callback(JSON.parse(message.body));
      }
    });
  };
};

export const sendMessage = (destination: string, message: any) => {
  if (!stompClient) {
    console.error('STOMP client is not initialized.');
    return;
  }

  stompClient.publish({ destination, body: JSON.stringify(message) });
};
