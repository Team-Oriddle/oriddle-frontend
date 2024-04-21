import { styled } from "styled-components";

const LeaderBoardBlock = () => {
  // 본인에 해당하는 부분은 다른 색상을 지니고 있다.

  return (
    <Container>
      {/* 순위 박스 */}
      <Title>순위표</Title>

      {/* TODO: 플레이어 수에 따라 해당 박스 개수 조절, 본인에 해당하는 박스는 다른 스타일로 표시 */}
      <LeaderBoardBox>
        {/* 좌측 박스 컨텐츠 */}
        <LeaderBoardBoxUserInfo>
          {/* player index 넣는 곳(#1, #2, #3 ...) */}
          <UserIndex>#1</UserIndex>
          {/* 프로필 이미지 넣는 곳 */}
          <UserImage>프사</UserImage>
          {/* 닉네임 들어가는 곳 */}
          <UserNickname>닉네임</UserNickname>
        </LeaderBoardBoxUserInfo>

        {/* 점수 들어가는 곳 */}
        <Score>20343점</Score>
      </LeaderBoardBox>
    </Container>
  );
};

export default LeaderBoardBlock;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  background-color: white;
  margin-top: 20px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 50px;
  font: semi-bold;
  text-align: start;
  color: black;
`;

const LeaderBoardBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 80px;
  background-color: white;
  border: 1px solid black;
  border-radius: 40px;
  color: black;
  padding: 0 40px;
`;

const LeaderBoardBoxUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const UserIndex = styled.div`
  font-size: 20px;
  font: semi-bold;
  color: black;
  margin-right: 40px;
`;

const UserImage = styled.div`
  width: 40px;
  height: 40px;
  background-color: #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserNickname = styled.div`
  font-size: 20px;
  font: semi-bold;
  color: black;
`;

const Score = styled.div`
  font-size: 20px;
  font: semi-bold;
  color: black;
`;
