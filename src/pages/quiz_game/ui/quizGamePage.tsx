import { UserChat } from "@/components/game/UserChat";
import { Question } from "@/components/game/Question";
import { QuizSource } from "@/components/game/QuizSource";
import { Header } from "@/components/header/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initializeSocket } from "@/entities/socket/socket";
import Modal from "@/components/game/Modal";
import { SendMessage } from "@/features/SendMessage/ui/sendMessage";
import { getQuizRoomData } from "@/entities/quizroom";
import {   useStomp } from "@/entities/socket/lib/SocketProvider";

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
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`;

const ParentForLoadingUI = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column: 1/13;
`;

const LoadingUI = styled.div`
  grid-column: 1/13;
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

interface QuestionDataType {
  description: string;
  number: number;
  score: number;
  source: string;
  sourceType: string;
  timeLimit: number;
  type: string;
}

interface UserData {
  nickname: string;
  position: number;
  userId: number;
  isHost: boolean;
  score: number;
}

interface ChatType {
  user: string;
  chat: string;
}

interface AnswerType {
  userId?: number;
  answer: string;
  score?: number;
}

export const QuizGamePage = ({ QuizGameId }: QuizGameProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState<QuestionDataType>({
    description: "",
    number: -1,
    score: -1,
    source: "",
    sourceType: "",
    timeLimit: -1,
    type: "",
  });
  const [chatLog, setChatLog] = useState<ChatType[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [answerData, setAnswerData] = useState<AnswerType>({
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
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null);
  const [questionTimer, setQuestionTimer] = useState(30); // New timer for the question


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
      // 필요한 추가 로직
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/question`, (message) => {
      setIsLoading(false);
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      setQuestionData(socketData);      // 필요한 추가 로직
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
      // 필요한 추가 로직
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/finish`, (message) => {
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      router.push(`/quiz-result/${socketData.quizResultId}`);      // 필요한 추가 로직
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/time-out`, (message) => {
      const socketData = JSON.parse(message.body)
      console.log(socketData);
      setAnswerData(socketData);
      toggleFinishModal();      // 필요한 추가 로직
    });
    client.subscribe(`/topic/quiz-room/${QuizGameId}/chat`, (message) => {
      const socketData = JSON.parse(message.body);
      setCurrentChat(socketData);      // 필요한 추가 로직
    });
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
        <UserChat UserList={userData} currentChat={currentChat} />
        <SendMessage quizGameId={QuizGameId} />
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