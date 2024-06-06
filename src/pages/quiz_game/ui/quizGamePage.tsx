import { UserChat } from "@/components/game/UserChat";
import { Question } from "@/components/game/Question";
import { QuizSource } from "@/components/game/QuizSource";
import { Header } from "@/components/header/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/game/Modal";
import { SendMessage } from "@/features/SendMessage/ui/sendMessage";
import { getQuizRoomData } from "@/entities/quizroom";
import {   useStomp } from "@/entities/socket/lib/SocketProvider";
import { ChatList } from "@/components/attend/ChatList";
import { Answer, ChatData, QuestionData, UserData } from "@/shared/type";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: white;
  color: black;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ParentForLoadingUI = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingUI = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 430px;
  font-size: 72px;
  font-weight: bolder;
  color: #643dd2;
`;

type QuizGameProps = {
  QuizGameId: string;
};

export const QuizGamePage = ({ QuizGameId }: QuizGameProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState<QuestionData>({
    description: "",
    number: -1,
    score: -1,
    source: "",
    sourceType: "",
    timeLimit: -1,
    type: "",
  });
  const [userData, setUserData] = useState<UserData[]>([]);
  const [answerData, setAnswerData] = useState<Answer>({
    userId: -1,
    answer: "",
    score: -1,
  });
  const [answerUser, setAnswerUser] = useState<string>("");
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const toggleAnswerModal = () => setAnswerModalOpen(!answerModalOpen);
  const toggleFinishModal = () => setFinishModalOpen(!finishModalOpen);
  const [loadingText, setLoadingText] = useState("Loading");
  const [timer, setTimer] = useState(5);
  const [doit, setDoit] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatData | null>(null);
  const [chatList, setChatList] = useState<ChatData[]>([]); //
  const [questionTimer, setQuestionTimer] = useState<number>(30);
  const [ viewChattingLog, setViewChattingLog ]= useState<boolean>(false) 


  useEffect(() => {
    getQuizRoomData(QuizGameId).then((result) => {
      const participants = result.participants.map((participant) => ({
        ...participant,
        score: 0,
      }));
      setUserData(participants);
    });
    setDoit(true);
    setSocketConnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => (prev.length < 10 ? prev + "." : "Loading"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [isLoading]);

  const {client, connected} = useStomp();

  //TODO: 퀴즈 게임방으로 접속할시 에러 발생함
  const setSocketConnect = () => {
    client.subscribe(`/topic/quiz-room/${QuizGameId}/join`, (message) => {
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      let newUser = { ...socketData, isHost: false };
      setUserData((prevUserData) => {
        const updatedUserData = [...prevUserData, newUser];
        return updatedUserData.sort((a, b) => a.position - b.position);
      });
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/leave`, (message) => {
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      setUserData((prevUserData) => {
        const updatedUserData = prevUserData.filter(
          (player) => player.userId !== socketData.userId
        );
        return updatedUserData;
      });
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/question`, (message) => {
      setIsLoading(false);
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      setQuestionData(socketData);    
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/answer`, (message) => {
      console.log(userData);
      const socketData = JSON.parse(message.body)
      setAnswerData(socketData);
      setUserData((prevUserData) => {
        const updatedUserData = prevUserData.map((user) =>
          user.userId === socketData.userId
            ? { ...user, score: user.score + socketData.score }
            : user
        );
        const answerUser = updatedUserData.find(
          (user) => user.userId === socketData.userId
        );
        if (answerUser) {
          setAnswerUser(answerUser.nickname);
        } else {
          console.log("사용자가 존재하지 않습니다!");
        }
        return updatedUserData;
      });
      toggleAnswerModal();
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/finish`, (message) => {
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      router.push(`/quiz-result/${socketData.quizResultId}`);     
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/time-out`, (message) => {
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      setAnswerData(socketData);
      toggleFinishModal();  
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/chat`, (message) => {
      const socketData = JSON.parse(message.body);
      setChatList((prevChatList) => [...prevChatList, socketData]);
      setCurrentChat(socketData);    
    });
    //TODO: 구독 해제가 필요함
  }

  return (
    <Container>
      <Wrapper>
        <Header />
        {isLoading ? (
          <LoadingUI>
            {loadingText}
            <div>{timer}</div>
          </LoadingUI>
        ) : (
          <ParentForLoadingUI>
            <Question
              description={questionData.description}
              number={questionData.number}
              type={questionData.type}
              score={questionData.score}
            />
            <QuizSource
              url={questionData.source}
              sourceType={questionData.sourceType}
            />
          </ParentForLoadingUI>
        )}
        {
          viewChattingLog 
            ? 
          <ChatList 
            OpenChatList={()=>setViewChattingLog(false)} 
            width={1440}
            chatList={chatList}
          />
            :
          <UserChat 
            UserList={userData} 
            currentChat={currentChat} 
          />
        }
        <SendMessage 
          OpenChatList={()=>setViewChattingLog(true)} 
          width={1440} 
          placeholder={"정답을 입력해주세요"} 
          quizGameId={QuizGameId} 
        />
        <Modal isOpen={answerModalOpen} onClose={toggleAnswerModal}>
          <div>정답: {answerData.answer}</div>
          <div>{answerUser} 님이 정답을 맞추셨습니다</div>
          <div>(+{answerData.score}점)</div>
        </Modal>
        <Modal isOpen={finishModalOpen} onClose={toggleFinishModal}>
          <div>정답은 {answerData.answer}입니다</div>
        </Modal>
      </Wrapper>
    </Container>
  );
};