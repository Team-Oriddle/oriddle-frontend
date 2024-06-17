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
  background-color: white;
  color: black;
`;

export const QuizRoomListPage = () => {
  
  return(
    <Container>
    <Header/>
    <ViewQuizRoomList/>
  </Container>
  )
}