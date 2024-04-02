import { Header } from "@/components/header/Header";
import { QuizList } from "@/components/main/QuizList";
import styled from "styled-components";

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
  height: 1000px;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`

const Description = styled.div`
  margin-top: 100px;
  margin-bottom: 155px;
  grid-column: 1/5;
  font-size: 100px;
  font-weight: bolder;
`

const MainContainer = () => {
  return (
    <Container>
      <Wrapper>
        <Header></Header>
        <Description>퀴즈 리스트</Description>
        {/* 퀴즈 리스트 컨트롤러 */}
        <QuizList></QuizList>
      </Wrapper>
    </Container>
  );
};

export default MainContainer;