import { Header } from "@/components/header/Header";
import { styled } from "styled-components";
import IntroBlock from "./IntroBlock";
import CategoryBlock from "./CategoryBlock";
import QuizGameBlock from "./QuizGameBlock";
import QuizResultBlock from "./QuizResultBlock";

export const LandingPage = () => {
  return (
    <Container>
      {/* 헤더 */}
      <Header />

      {/* 인트로 블록 */}
      <IntroBlock />

      {/* 카테고리 기능 블록 */}
      <CategoryBlock />

      {/* TODO: 퀴즈게임 블록 */}
      <QuizGameBlock />

      {/* TODO: 퀴즈 결과 블록 */}
      <QuizResultBlock />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #f5ecdf;
  background-image: url("/landing/landing_background.png");
  background-repeat: no-repeat;
  background-position: center;
  height: 4394px;
`;
