import { useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`
const QuizBox = styled.div`
  width: 220px;
  height: 124px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  margin-bottom: 12px;
  transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
`

export const ChooseQuizFromCreatePage = ({quizList, onQuizSelect}:any)=>{

  useEffect(()=>{
    console.log(quizList)
  },[quizList])

  return(
    <Container>
      {quizList.map((quiz:any,index:any) =>(
        <QuizBox key={index} onClick={()=>onQuizSelect(quiz.number)}>
          {quiz.description}
          {quiz.number}
        </QuizBox>
      ))}
    </Container>
  )
}