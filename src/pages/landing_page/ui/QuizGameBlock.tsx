import Image from "next/image";
import { styled } from "styled-components";

const QuizGameBlock = () => {
  return (
    <Container>
      {/* 이미지 필드 */}
      <QuizGameBlockLeft>
        {/* TODO: 이미지 들어갈 박스 영역 */}
        <ImageBox>여기에 이미지를 추가하세요.</ImageBox>
      </QuizGameBlockLeft>

      <Image
        src='/landing/green_duck.png'
        alt='랜딩 그린 오리'
        style={{
          position: "absolute",
          zIndex: 0,
          transform: "translate(-100px, -300px)",
        }}
        width={192}
        height={344}
      />

      {/* 우측 텍스트 영역 */}
      <QuizGameBlockRight>
        <Title>승부의 긴장감이 당신을 기다립니다!</Title>
        <Content>
          오리들은 친구와의 대결을 통해 더욱 즐거운 경험을 제공합니다.
          <br />
          친구들과 함께하는 퀴즈 대결은 당신의 지식과 친구들 간의 승부욕을
          <br />
          자극하며, 긴장감 넘치는 퀴즈를 경험할 수 있습니다.
          <br />
          친구 초대 기능을 통해 손쉽게 친구들을 대결에 초대하고,
          <br />
          누가 더 많은 문제를 맞출 지 경쟁해하세요!
          <br />
          함께 퀴즈를 풀며 즐거운 시간을 보내고,
          <br />
          친구들과의 우정을 더욱 강화할 수 있는 특별한 경험을
          <br />
          ORIDDLE에서 경험해보세요.
        </Content>
      </QuizGameBlockRight>
    </Container>
  );
};

export default QuizGameBlock;

const Container = styled.div`
  width: 1440px;
  height: 1080px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const QuizGameBlockLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 50%;
  z-index: 1;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font: bold;
  text-align: start;
  color: black;
`;

const Content = styled.p`
  font-size: 16px;
  text-align: start;
  color: black;
`;

const QuizGameBlockRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 50%;
  gap: 20px;
  z-index: 1;
  padding-left: 100px;
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
`;
