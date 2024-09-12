import { userAtom } from "@/store/userAtom";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import styled from "styled-components";

// const mockResponse = {
//   code: "QS0001",
//   message: "퀴즈 결과 조회를 성공했습니다.",
//   data: {
//     rankingTable: [
//       {
//         rank: 1,
//         userId: "cfaa62fd-376b-42ed-99f0-c8204bd29f26",
//         nickname: "창의적인오리8415",
//         score: 30,
//       },
//       {
//         rank: 2,
//         userId: "d1032119-a9c7-468a-967a-a8fe54dbf519",
//         nickname: "다재다능한오리7539",
//         score: 0,
//       },
//     ],
//   },
// };

const LeaderBoardBlock = ({ quizRoomId, resultId }: { quizRoomId: string, resultId:string }) => {
  const [results, setResults] = useState<{ rankingTable: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userData] = useAtom(userAtom);

  useEffect(() => {
    const baseUrl = `http://localhost:8080/api/v1/quiz-result/${resultId}`;

    const fetchResult = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResults(response.data.data); // Assuming `response.data.data` contains the rankingTable
        console.log(response.data);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };

    fetchResult();
  }, [quizRoomId]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 본인에 해당하는 부분은 다른 색상을 지니고 있다.
  return (
    <Container>
      {/* 순위 박스 */}
      <Title>순위표</Title>

      {/* TODO: 플레이어 수에 따라 해당 박스 개수 조절, 본인에 해당하는 박스는 다른 스타일로 표시 */}
      {/* 좌측 박스 컨텐츠 */}
      {results && results.rankingTable ? (
        results.rankingTable.map((result) => {
          const isCurrentUser = userData.user?.id === result.userId;
          return (
            // 본인에 해당하는 부분은 다른 색상을 지니고 있다.
            // TODO: userData.user?.id를 통해 key값과 같다면 다른 색상을 지니게 한다.
            <LeaderBoardBox key={result.userId} isCurrentUser={isCurrentUser}>
              <LeaderBoardBoxUserInfo>
                <UserIndex>#{result.rank}</UserIndex>
                <UserImage>ori</UserImage>
                <UserNickname>{result.nickname}</UserNickname>
              </LeaderBoardBoxUserInfo>
              <Score>{result.score}점</Score>
            </LeaderBoardBox>
          );
        })
      ) : (
        <div>No results found</div>
      )}
      {/* 점수 들어가는 곳 */}
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
  margin-top: 20px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 50px;
  font: semi-bold;
  text-align: start;
  color: black;
`;

interface LeaderBoardBoxProps {
  isCurrentUser: boolean;
}

const LeaderBoardBox = styled.div<LeaderBoardBoxProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 80px;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? "blue" : "white"};
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
