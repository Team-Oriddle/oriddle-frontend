import * as Stomp from 'webstomp-client';

class InGameSocket {
  constructor(quizRoomId, setParticipants, setQuestionData, setAnswer, navigate) {
    this.quizRoomId = quizRoomId;
    this.setParticipants = setParticipants; 
    this.setQuestionData = setQuestionData; 
    this.setAnswer = setAnswer; 
    this.navigate = navigate; 
    this.connect();
  }

  connect() {
    const serverURL = 'ws://localhost:8080/ws';
    const socket = new WebSocket(serverURL);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    this.connected = true;
    this.subscribeToChannels();
  };

  subscribeToChannels() {
    this.stompClient.subscribe(`/topic/quiz-room/${this.quizRoomId}/join`, message => {
      const newPlayer = JSON.parse(message.body);
      this.setParticipants(prev => [...prev, newPlayer].sort((a, b) => a.position - b.position));
    });

    this.stompClient.subscribe(`/topic/quiz-room/${this.quizRoomId}/leave`, message => {
      const userId = JSON.parse(message.body).userId;
      this.setParticipants(prev => prev.filter(player => player.userId !== userId));
    });

  }

  sendMessage(msg, type) {
    if (this.stompClient && this.connected) {
      let endpoint = `/app/quiz-room/${this.quizRoomId}`;
      switch(type) {
        case 'chat':
          endpoint += '/chat';
          break;
        case 'check-answer':
          endpoint += '/check-answer';
          break;
        default:
          console.error('Invalid message type');
          return;
      }
      this.stompClient.send(endpoint, JSON.stringify({ answer: msg }), {});
    }
  }

  onError = (error) => {
    console.log('WebSocket error', error);
  };
}

export default InGameSocket;
