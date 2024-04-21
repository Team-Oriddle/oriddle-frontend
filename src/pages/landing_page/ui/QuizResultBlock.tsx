import Image from "next/image";
import { styled } from "styled-components";

const QuizResultBlock = () => {
  return (
    <Container>
      <ImageBox>여기에 이미지를 추가하세요.</ImageBox>
      <Title>
        랭킹을 통해 자신의 실력을 확인하고 <br />
        순위에 도전하세요.
      </Title>
      <Content>
        퀴즈를 풀며 얻은 점수를 기반으로 순위를 나타내어, 자신의 실력을
        확인하고, 세계적인 순위에 도전
        <br />
        하여 퀴즈 마스터로서의 명성을 쌓아보세요. 랭킹을 통해 자신의 성장을
        추적하고 다른 플레이어들
        <br />
        과의 경쟁을 즐길 수 있는 흥미진진한 경험을 해보세요. ORIDDLE이 당신의
        탐험을 기다립니다!
      </Content>
      <Image
        src='/landing/purple_yellow_ducks.png'
        alt='랜딩 퍼플 옐로우 오리'
        style={{
          position: "absolute",
          zIndex: 0,
          transform: "translate(0px, 120px)",
        }}
        width={1440}
        height={450}
      />
    </Container>
  );
};

export default QuizResultBlock;

const Container = styled.div`
  width: 1440px;
  height: 1235px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ImageBox = styled.div`
  width: 703px;
  height: 469px;
  border-radius: 40px;
  background-color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: black;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 40px;
  font: bold;
  text-align: center;
  color: black;
  z-index: 1;
`;

const Content = styled.p`
  font-size: 16px;
  text-align: start;
  color: black;
  z-index: 1;
`;
