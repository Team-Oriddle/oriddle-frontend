import { ChatInput } from "@/components/game/ChatInput";
import { UserChat } from "@/components/game/UserChat";
import { Question } from "@/components/game/Question";
import { QuizSource } from "@/components/game/QuizSource";
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


const GameContainer: React.FC = () => {

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
