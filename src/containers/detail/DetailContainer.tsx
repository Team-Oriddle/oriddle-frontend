import { QuizInfo } from "@/components/detail/QuizInfo";
import { Header } from "@/components/header/Header";
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
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`
interface Props{
  quizId :number
}

const DetailContainer = ({quizId}:Props) => {

  const param = quizId 

  return (
    <Container>
      <Wrapper>
          <Header></Header>
          <QuizInfo quizId={param} ></QuizInfo>
      </Wrapper>
    </Container>
  );
};

export default DetailContainer;
