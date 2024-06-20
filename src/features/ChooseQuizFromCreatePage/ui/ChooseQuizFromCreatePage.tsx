import Image from "next/image"
import { useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  align-items: center;
`
const QuizBox = styled.div`
  width: 220px;
  height: 124px;
  display: flex;
  flex-direction: column;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  margin-bottom: 12px;
  transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.03);
    }

`
const QuizImage = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Number = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  background-color: #FD7400;
  border-radius: 50%;
  margin: 4px;
`

const DeleteButton = styled(Number)` 
  width: 80px;
  border-radius: 20px;
  &:hover{
    cursor: pointer;
  }
  margin: 4px;
`

const EditQuizButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 99;
`

export const ChooseQuizFromCreatePage = ({quizList, onQuizSelect, onQuizDelete}:any)=>{

  useEffect(()=>{
    console.log(quizList)
  },[quizList])

  return(
    <Container>
      {quizList.map((quiz:any,index:any) =>(
        <QuizBox key={index} onClick={()=>onQuizSelect(quiz.number)}>
          <EditQuizButton>
          <Number>{index+1}</Number>
          <DeleteButton onClick={()=>onQuizDelete(quiz.number)}> 삭제 하기</DeleteButton>
          </EditQuizButton>
          <QuizImage>
            {
              quiz?.source === '' ? null : 
              (
                quiz?.sourceType === 'IMAGE' ? (
                  <Image
                  src={quiz?.source}
                  alt="썸네일"
                  layout="fill"
                  objectFit="cover"
                />
                ) : (
                  quiz?.sourceType === 'VIDEO' ? (
                    <div>비디오</div>
                  ) : (
                    <div>음악</div>
                  )
                )
              )
            }
          </QuizImage>
        </QuizBox>
      ))}
    </Container>  
  )
}