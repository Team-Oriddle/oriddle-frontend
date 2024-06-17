import styled from "styled-components";
import { ViewQuizRoomCard } from "./ViewQuizRoomCard";
import { useEffect, useState } from "react";
import { getQuizListData } from "@/entities/quiz";
import { getQuizRoomListData } from "@/entities/quizroom";

type Quiz = {
  quizId: number;
  title: string;
  imageUrl: string;
  description: string;
};

export const ViewQuizRoomList = () => {
  const [quizRoomLists, setQuizRoomLists] = useState([]);

  useEffect(() => {
    getQuizRoomListData().then((data) => {
      setQuizRoomLists(data.quizRooms);
    });
  }, []);


  return(
    <Layout>
    {/* <QuizListController>인기순 | 최신순 | 이름순</QuizListController> */}
    <QuizLayout>
      {quizRoomLists?.length > 0 ? (
        quizRoomLists.map((room) => (
          <ViewQuizRoomCard
            key={room?.id}
            id={room?.id}
            title={room?.roomTitle}
            quizTitle={room?.quizTitle}
            maxParticipant={room?.maxParticipant}
            currentParticipant={room?.currentParticipant}
            status={room?.status}
            imageUrl={room?.image}
          />
        ))
      ) : (
        <p>리스트가 없습니다.</p>
      )}
    </QuizLayout>
  </Layout>
  )
}

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizLayout = styled.div`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 24px;
  column-gap: 20px;
  @media (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1080px;
  }
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 786px;
  }
  //TODO: 그리드 적용
`;
