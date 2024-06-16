import styled from "styled-components";
import { ViewQuizCard } from './ViewQuizCard';
import { useEffect, useState } from "react";
import { getQuizListData } from "@/entities/quiz";
//생각해아할 부분 퀴즈 컨트롤러 컴포넌트로 따로 뺴서 valueChange로 관리할것인지
//아니면 그냥 여기서 관리할 것 인지 고민하고 결정

// 추후 마우스를 올렸을 때 타입을 보기 편하도록 type으로 변경
type Quiz = {
  quizId: number;
  title: string;
  imageUrl: string;
  description: string;
};

export const ViewQuizList = () => {
  const [quizLists, setQuizLists] = useState<Quiz[]>([]);

  useEffect(() => {
    getQuizListData().then((data) => {
      setQuizLists(data);
    });
  }, []);

  return (
    <Layout>
      {/* <QuizListController>인기순 | 최신순 | 이름순</QuizListController> */}
      <QuizLayout>
        {quizLists?.length > 0 ? (
          quizLists.map((quiz) => (
            <ViewQuizCard
              key={quiz?.quizId}
              id={quiz?.quizId}
              title={quiz?.title}
              content={quiz?.description}
              imageUrl={quiz?.imageUrl}
            />
          ))
        ) : (
          <p>리스트가 없습니다.</p>
        )}
      </QuizLayout>
    </Layout>
  );
};


const Layout = styled.div`
  margin-top: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
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

const QuizListController = styled.div`
  width: 1440px;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: end;
`;