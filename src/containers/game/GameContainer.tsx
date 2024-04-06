import { ChatInput } from "@/components/game/ChatInput";
import { UserChat } from "@/components/game/UserChat";
import { Question } from "@/components/game/Question";
import { QuizSource } from "@/components/game/QuizSource";
import { Header } from "@/components/header/Header";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InGameSocket from "@/socket/InGameChatSocket";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh; // Viewport Height
  width: 100vw; // Viewport Width
  min-width: 100vw;
  background-color: white;
  color: black;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`


const GameContainer: React.FC = ({quizId}:Props) => {

  const quizRoomId = quizId 

  const navigate = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [questionData, setQuestionData] = useState({
    number: 0,
    description: "퀴즈가 준비중입니다",
    type: "미정",
    sourceType: "IMAGE",
    source: null,
    score: "미정",
    timeLimit: 30
  });
  const [gameSocket, setGameSocket] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const getUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      setUserData(response.data.data.participants);
      const socket = new InGameSocket(quizRoomId, setParticipants, setQuestionData, setAnswer, navigate);
      setGameSocket(newGameSocket);
      setQuestionData(newGameSocket.QuestionData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [quizRoomId, navigate, userData, questionData]);

  useEffect(() => {
    let intervalId = null;
    if (gameSocket && gameSocket.answer) {
      setCountdown(5);
      intervalId = setInterval(() => {
        setCountdown(prevCountdown => {
          const newCountdown = prevCountdown - 1;
          if (newCountdown <= 0) {
            clearInterval(intervalId);
          }
          return newCountdown;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [gameSocket]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);




  return (
    <Container>
      <Wrapper>
          <Header></Header>
          <Question></Question>
          <QuizSource></QuizSource>
          <UserChat></UserChat>
          <ChatInput></ChatInput>
      </Wrapper>
    </Container>
  );
};

export default GameContainer;
