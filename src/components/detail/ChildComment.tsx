import styled from "styled-components"


const Layout = styled.div`
  grid-column: 1/13;
`

const QuizImg = styled.div`
  grid-column: 1/6;
  height: 400px;
  background-color: aliceblue;

`

const QuizDetail = styled.div`
  grid-column: 6/13;
  height: 400px;
  background-color: aliceblue;
`

export const QuizInfo = () =>{
  return (
    <Layout>  
      <QuizImg></QuizImg>
      <QuizDetail></QuizDetail>
    </Layout>
  )
}