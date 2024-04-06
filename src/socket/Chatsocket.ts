// socket/chatSocket.ts

import { Stomp } from "@stomp/stompjs";

interface UserData{
  nickname:string,
  position: number,
  userId:number
}

export default class ChatSocket {
  stompClient: Stomp.Client | null = null;
  connected: boolean = false;
  quizRoomId: number;
  onUpdateParticipants: (participants: UserData[]) => void;
  onGameStart: (gameInfo: any) => void;
  
  constructor(quizRoomId: number, participants: UserData[], onUpdateParticipants: (participants: UserData[]) => void, onGameStart: (gameInfo: any) => void) {
    this.quizRoomId = quizRoomId;
    this.onUpdateParticipants = onUpdateParticipants;
    this.onGameStart = onGameStart;
    this.connect(participants);
  }

  connect(initialParticipants: UserData[]) {
    const serverURL = 'ws://localhost:8080/ws';
    const socket = new WebSocket(serverURL);
    
    this.stompClient = Stomp.over(socket);
    console.log(`${this.quizRoomId}번 방으로 접속중...`);
    this.stompClient.connect({}, () => this.onConnected(initialParticipants), this.onError);
  }

  onConnected = (initialParticipants: UserData[]) => {
    console.log("연결 성공");
    this.connected = true;

    this.onUpdateParticipants(initialParticipants);

    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/join`, message => {
      const newPlayer = JSON.parse(message.body);
      this.onUpdateParticipants(prev => [...prev, newPlayer]);
    });

    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/leave`, message => {
      const userId = JSON.parse(message.body).userId;
      this.onUpdateParticipants(prev => prev.filter(player => player.userId !== userId));
    });

    this.stompClient?.subscribe(`/topic/quiz-room/${this.quizRoomId}/start`, message => {
      this.onGameStart(JSON.parse(message.body));
    });
  }

  onError = () => {
    console.log('WebSocket 연결 에러');
  }

  sendMessage = (msg: any, quizRoomId: number) => {
    if (this.stompClient && this.connected) {
      const message = JSON.stringify(msg);
      this.stompClient.send(`/app/quiz-room/${quizRoomId}`, message, {});
    }
  }
}
