import { Header } from "@/components/header/Header";
import { styled } from "styled-components";
import ButtonBlock from "./ButtonBlock";
import LeaderBoardBlock from "./LeaderBoardBlock";
import { useEffect, useState } from "react";
import axios from "axios";

// 퀴즈 결과 페이지는 결과 표시를 위한 여러 스위칭 블록을 지니고 있습니다.
// 이 블록의 순서는 기획 단계이며, 변경될 수 있습니다.
// 1. 결과 순위표(LeaderBoardBlock)
// TODO: 2. 정답 정확도(AnswerAccuracyBlock)
// TODO: 3. 퀴즈 소요시간(QuizTimeBlock)
export const QuizResultPage = ({ slug }: { slug: string }) => {
  return (
    <Container>
      <Header />

      {/* 1. 순위표 블록 */}
      <LeaderBoardBlock slug={slug} />

      {/* TODO: 2. 정답 정확도(AnswerAccuracyBlock) */}

      {/* TODO: 3. 퀴즈 소요시간(QuizTimeBlock) */}

      {/* 하단 페이지 조작 버튼 */}
      <ButtonBlock />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: white;
  min-height: 100vh;
`;
