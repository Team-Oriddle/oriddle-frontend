import { useEffect, useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 1440px;
  background-color: white;
  height: 70px;
  color: black;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`;

export const Question = ({ description, number, type, score,}) => {
  let typeByKorean = "기타";
  if (type === "SHORT_ANSWER") {
    typeByKorean = "객관식";
  } else {
    typeByKorean = "주관식";
  }
  
  const [questionTimer, setQuestionTimer] = useState(30); // New timer for the question

  useEffect(() => {
    setQuestionTimer(30); // Reset the question timer to 30 seconds whenever questionData changes
  }, [number]);

  useEffect(() => {
    const questionTimeInterval = setInterval(() => {
      setQuestionTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(questionTimeInterval);
  }, [number]);

  return (
    <Layout>
      [{number}/3] {description} ({typeByKorean}, {score}점 ) 남은시간 : {questionTimer}초
      {/* timer가 30초의 시간을 카운팅하는 코드야ㅑ */}
    </Layout>
  );
};
