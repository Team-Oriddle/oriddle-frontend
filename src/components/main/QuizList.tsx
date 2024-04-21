import styled from "styled-components";
import { QuizCard } from "./QuizCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // useRouter 추가
import axios from "axios";

//생각해아할 부분 퀴즈 컨트롤러 컴포넌트로 따로 뺴서 valueChange로 관리할것인지
//아니면 그냥 여기서 관리할 것 인지 고민하고 결정

// 추후 마우스를 올렸을 때 타입을 보기 편하도록 type으로 변경
type Quiz = {
  quizId: number;
  title: string;
  imageUrl: string;
  description: string;
};

const Layout = styled.div`
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const QuizLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
  row-gap: 20px;
`;
const QuizListController = styled.div`
  width: 1440px;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: end;
`;

export const QuizList = () => {
  const [quizLists, setQuizLists] = useState<Quiz[]>([]);
  //나중에 patch로 변경하거나 할 예정
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/quiz/page/0`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );
        if (response.data.data.quizzes.length === 0) {
          // 리스트가 비어있을 때를 대비해 public/mockdData/quizList.json을 불러와서 세팅해보자
          const mockDataResponse = await fetch("/mockData/quizList.json");
          const mockData = await mockDataResponse.json();
          setQuizLists(mockData.data.quizzes);
          return;
        }
        setQuizLists(response.data.data.quizzes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizData();
  }, []);

  return (
    <Layout>
      <QuizListController>인기순 | 최신순 | 이름순</QuizListController>
      <QuizLayout>
        {quizLists.length > 0 ? (
          quizLists.map((quiz) => (
            <QuizCard
              key={quiz.quizId}
              id={quiz.quizId}
              title={quiz.title}
              content={quiz.description}
              imageUrl={quiz.imageUrl}
            />
          ))
        ) : (
          <p>리스트가 없습니다.</p>
        )}
      </QuizLayout>
    </Layout>
  );
};
