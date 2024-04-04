import styled from "styled-components"
import DefalutButton from "../common/DefalutButton"


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

export const QuizInfo = () =>{
  const ment = '게임 시작' 
  return (
    <Layout>  
      <QuizImg>썸네일 이미지</QuizImg>
      <QuizDetailLayout>
        <QuizDetail>
          <DefalutButton color="보라" txt={ment}></DefalutButton>
        </QuizDetail>
      </QuizDetailLayout>
    </Layout>
  )
}