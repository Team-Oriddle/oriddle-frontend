import MainBackground from "@/components/common/MainBackground";
import { Header } from "@/components/header/Header";
import { ViewQuizList } from "@/features/ViewQuizList";
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
  z-index: 10;
`;


export const Main = () => {
  return (
    <>
    <Container>
      <Header />
        {/* 퀴즈 리스트 컨트롤러 */}
        {/* TODO: 데이터를 불러오는 중에는 추가적인 처리 할 것 */}
        {/* TODO: 추가적으로 초기 상태에서 호출할 때 params를 넘겨서 ex)filter 인기순 설정 등 할 지 논의해볼 것 */}
      <ViewQuizList />
    </Container>
    </>
  );
};

