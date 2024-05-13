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
`;

// 임시로 1000px로 지정되어있던 높이를 100%로 변경
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr; // Header는 필요한 만큼의 공간을 차지하고, 나머지 공간은 QuizList가 차지합니다.
  column-gap: 24px;
  row-gap: 24px; // row 사이의 간격을 설정합니다.
`;

const MainContainer = () => {
  return (
    <Container>
      <Wrapper>
        <Header />
        {/* 퀴즈 리스트 컨트롤러 */}
        {/* TODO: 데이터를 불러오는 중에는 추가적인 처리 할 것 */}
        {/* TODO: 추가적으로 초기 상태에서 호출할 때 params를 넘겨서 ex)filter 인기순 설정 등 할 지 논의해볼 것 */}
        <QuizList />
      </Wrapper>
    </Container>
  );
};

export default MainContainer;
