import MainBackground from "@/components/common/MainBackground";
import { Header } from "@/components/header/Header";
import { ViewQuizList } from "@/features/ViewQuizList";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  min-width: 768px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Main = () => {
  useEffect (() => {
    sessionStorage.removeItem("redirectUrl");
  }, []);
  return (
    <>
      <MainBackground overlayText="퀴즈리스트">
        <Container>
          {/* 퀴즈 리스트 컨트롤러 */}
          {/* TODO: 데이터를 불러오는 중에는 추가적인 처리 할 것 */}
          {/* TODO: 추가적으로 초기 상태에서 호출할 때 params를 넘겨서 ex)filter 인기순 설정 등 할 지 논의해볼 것 */}
          <ViewQuizList />
        </Container>
      </MainBackground>
    </>


  );
};
