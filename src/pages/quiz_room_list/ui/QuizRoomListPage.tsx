import MainBackground from "@/components/common/MainBackground";
import { Header } from "@/components/header/Header";
import { ViewQuizRoomList } from "@/features/ViewQuizRoomList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh; 
  width: 100vw;
  min-width: 768px;
  color: black;
`;

export const QuizRoomListPage = () => {
  
  return(
    <>
      <MainBackground overlayText="퀴즈방 목록">
        <Container>
          <ViewQuizRoomList/>
        </Container>
      </MainBackground>
    </>

  )
}