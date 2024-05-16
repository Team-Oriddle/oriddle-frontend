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
  QuizGameId: number;
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
  }, [QuizGameId]);

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





  useEffect(() => {
    const getSocket = (quizRoomId: number) => {
      console.log("소켓 연결 시도중");
      const subscriptions = [
        {
          topic: `/topic/quiz-room/${quizRoomId}/join`,
          callback: (message) => {
            console.log(message);
            let newUser = { ...message, isHost: false };
            setUserData((prevUserData) => {
              const updatedUserData = [...prevUserData, newUser];
              return updatedUserData.sort((a, b) => a.position - b.position);
            });
          },
        },
        {
          topic: `/topic/quiz-room/${quizRoomId}/leave`,
          callback: (message) => {
            console.log(message);
            setUserData((prevUserData) => {
              const updatedUserData = prevUserData.filter(
                (player) => player.userId !== message.userId
              );
              return updatedUserData;
            });
          },
        },
        {
          topic: `/topic/quiz-room/${quizRoomId}/question`,
          callback: (message) => {
            setIsLoading(false);
            console.log(message);
            setQuestionData(message);
          },
        },
        {
          topic: `/topic/quiz-room/${quizRoomId}/answer`,
          callback: (message) => {
            console.log(userData);
            console.log(message);
            setAnswerData(message);
            setUserData((prevUserData) => {
              const updatedUserData = prevUserData.map((user) =>
                user.userId.value === message.userId
                  ? { ...user, score: user.score + message.score }
                  : user
              );
              const answerUser = updatedUserData.find(
                (user) => user.userId.value === message.userId
              );
              if (answerUser) {
                setAnswerUser(answerUser.nickname);
              } else {
                console.log("사용자가 존재하지 않습니다!");
              }
              return updatedUserData;
            });
            toggleAnswerModal();
          },
        },
        {
          topic: `/topic/quiz-room/${quizRoomId}/finish`,
          callback: (message) => {
            console.log(message);
            router.push(`/quiz-result/${message.quizResultId}`);
          },
        },
        {
          topic: `/topic/quiz-room/${quizRoomId}/time-out`,
          callback: (message) => {
            console.log(message);
            setAnswerData(message);
            toggleFinishModal();
          },
        },
        {
          topic: `/topic/quiz-room/${quizRoomId}/chat`,
          callback: (message) => {
            console.log(message);
            setCurrentChat(message);
            //TODO: 백엔드 채팅이 끝나면 채팅 관련 코드 추가
          },
        },
      ];
      initializeSocket("ws://localhost:8080/ws", subscriptions);
    };
    console.log("useEffect작동");
    getSocket(QuizGameId);
  }, [doit, QuizGameId]);

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