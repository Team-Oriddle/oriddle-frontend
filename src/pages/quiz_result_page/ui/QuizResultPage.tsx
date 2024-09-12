import { Header } from "@/components/header/Header";
import { styled } from "styled-components";
import ButtonBlock from "./ButtonBlock";
import LeaderBoardBlock from "./LeaderBoardBlock";
import { useEffect, useState } from "react";
import { useStomp } from "@/entities/socket/lib/SocketProvider";
import MainBackground from "@/components/common/MainBackground";

// 퀴즈 결과 페이지는 결과 표시를 위한 여러 스위칭 블록을 지니고 있습니다.
// 이 블록의 순서는 기획 단계이며, 변경될 수 있습니다.
// 1. 결과 순위표(LeaderBoardBlock)
// TODO: 2. 정답 정확도(AnswerAccuracyBlock)
// TODO: 3. 퀴즈 소요시간(QuizTimeBlock)
export const QuizResultPage = ({ quizRoomId, resultId }: { quizRoomId: string, resultId:string }) => {
  const { client, connected } = useStomp();

  const setSocketConnect = () => {
    const subscriptions = [
      client.subscribe(`/topic/quiz-room/${quizRoomId}/chat`, (message) => {
        console.log('chat', message)
      }),
    ];

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  };

  useEffect(() => {
    if (client) {
      client.onConnect = () => {
        setSocketConnect();
      };
      client.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };
    }
  }, [client]);

  return (
    <>
      <MainBackground overlayText="">
        <Container>
          {/* 1. 순위표 블록 */}
          <LeaderBoardBlock quizRoomId={quizRoomId} resultId={resultId}  />

          {/* TODO: 2. 정답 정확도(AnswerAccuracyBlock) */}

          {/* TODO: 3. 퀴즈 소요시간(QuizTimeBlock) */}

          {/* 하단 페이지 조작 버튼 */}
          <ButtonBlock quizRoomId={quizRoomId} />
        </Container>
      </MainBackground>
    </>

  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
`;

export default QuizResultPage;
