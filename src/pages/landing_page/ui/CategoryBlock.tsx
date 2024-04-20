import Image from "next/image";
import { styled } from "styled-components";

const CategoryBlock = () => {
  return (
    <Container>
      {/* 좌측 텍스트 영역 */}
      <CategoryBlockLeft>
        <Title>
          흥미와 선호도에 맞는
          <br />
          퀴즈를 즐기세요!
        </Title>
        <Content>
          오리들은 다양한 주제를 다루며, 풍부한 경험을 제공합니다.
          <br />
          역사, 과학, 엔터테인먼트, 문화, 스포츠 등 다양한 주제들을
          <br />
          포함하여 여러분의 흥미와 선호도에 맞는 퀴즈를 즐길 수 있
          <br />
          습니다. 언제 어디서나 당신의 지식과 호기심을 키울 수 있는
          <br />
          퀴즈 플랫폼입니다.
        </Content>
      </CategoryBlockLeft>

      {/* 중앙에 위치해있는 flex 무시하는 이미지 */}
      {/* TODO: 중앙을 기준으로 이미지 위치를 옮기려면? */}
      <Image
        src='/landing/red_duck.png'
        alt='랜딩 레드 오리'
        style={{ position: "absolute", zIndex: 0 }}
        width={419}
        height={419}
      />

      {/* 이미지 필드 */}
      <CategoryBlockRight>
        {/* TODO: 이미지 들어갈 박스 영역 */}
        <ImageBox>여기에 이미지를 추가하세요.</ImageBox>
      </CategoryBlockRight>
    </Container>
  );
};

export default CategoryBlock;

const Container = styled.div`
  width: 1440px;
  height: 1080px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const CategoryBlockLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 50%;
  gap: 20px;
  z-index: 1;
  padding-left: 100px;
`;

const Title = styled.h1`
  font-size: 40px;
  font: bold;
  text-align: start;
  color: black;
`;

const Content = styled.p`
  font-size: 20px;
  text-align: start;
  color: black;
`;

const CategoryBlockRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 50%;
  z-index: 1;
  padding-bottom: 100px;
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
