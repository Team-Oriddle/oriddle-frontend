import { Header } from "@/components/header/Header";
import Image from "next/image";
import { styled } from "styled-components";

const LandingContainer = () => {
  return (
    <Container>
      {/* 헤더 */}
      <Header />

      {/* 인트로 블록 */}
      <IntroBlock>
        {/* 좌측 캐릭터 이미지 영역 */}
        <IntroBlockLeft>
          <Image
            src='/landing/spinks_duck.png'
            alt='랜딩 스핑크스 오리'
            width={565}
            height={537}
          />
        </IntroBlockLeft>
        {/* 우측 텍스트 영역 */}
        <IntroBlockRight>
          <Title>
            퀴즈를 <br /> 덕덕하게!
          </Title>
          <Content>
            ORRIDLE은 퀴즈를 준비하고 게시한 뒤, 방을 만들어
            <br /> <br />
            원하는 친구들을 초대해 실시간으로 퀴즈를 푸는 서비스입니다.
            <br /> <br />
            친구들과 덕덕한 퀴즈 탐험을 시작해 보세요!
          </Content>
          <Button>퀴즈 시작하기</Button>
          {/* TODO: 여기에 퀴즈 시작하기 버튼 연결하기 */}
        </IntroBlockRight>
      </IntroBlock>

      {/* TODO: 카테고리 기능 블록 */}

      {/* TODO: 퀴즈 진행 블록 */}

      {/* TODO: 퀴즈 결과 블록 */}
    </Container>
  );
};

export default LandingContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #f5ecdf;
  background-image: url("/landing/landing_background.png");
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  width: 1440px;
  height: 900px;
`;

const IntroBlockLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 50%;
`;

const IntroBlockRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 50%;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 70px;
  font: bold;
  text-align: start;
  color: black;
`;

const Content = styled.p`
  font-size: 20px;
  text-align: start;
  color: black;
`;

const Button = styled.button`
  width: 219px;
  height: 72px;
  background-color: #643dd2;
  border-radius: 1000px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f5ecdf;
    color: black;
  }
`;
