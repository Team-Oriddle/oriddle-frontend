import styled from "styled-components"
import DefalutButton from "../common/DefalutButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from "next/navigation"


const Layout = styled.div`
  margin-top: 250px;
  display: grid;
  column-gap: 24px;
  grid-column: 1/13;
  grid-template-columns: repeat(12, 1fr);
`

const QuizImg = styled.div`
  grid-column: 1/6;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`

const QuizDetailLayout = styled.div`
  grid-column: 6/13;
  height: 400px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  display: flex;
  justify-content: center;
  align-items: center;
`

const QuizDetail = styled.div`
  margin: 30px 65px;
`

interface Props{
  quizId :number
}

export const QuizInfo = ({quizId}:Props) =>{
  const ment = '게임 시작' 
  const id = quizId

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //추후에 구조 분해 할당 활용한 코드로 수정

  useEffect(()=>{
    const fetchQuizDetail =async (id:number) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quiz/info/${id}`)

        console.log(response)
        setTitle(response.data.data.title)
        setDescription(response.data.data.description)
        
      } catch (error) {
        console.error('Error fetching quiz info:', error);
      }
    }

    fetchQuizDetail(id)
  })

  return (
    <Layout>  
      <QuizImg>썸네일 이미지</QuizImg>
      <QuizDetailLayout>
        <QuizDetail>
          {title}
          {description}
          <DefalutButton color="보라" txt={ment}></DefalutButton>
          
        </QuizDetail>
      </QuizDetailLayout>
    </Layout>
  )
}