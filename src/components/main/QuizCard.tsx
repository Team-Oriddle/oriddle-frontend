import styled from "styled-components"


interface Props{
  title:string,
  content:string
}
const Layout = styled.div`
  height: 500px;
  padding: 16px;
  background-color: #ffffff;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`
// 추후에 img로 변경
const Quizimg = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4F3E2E;
  margin: 5px;
`

const Title = styled.div`
  width: 300px;
  height: 48px;
  font-size: 20px;
  font-weight: 700;
  color: black;
  margin: 5px;
`

const Context = styled(Title)`
  font-size: 15px;
  font-weight: 400;

`

export const QuizCard = ({title,content}:Props) => {
  return(
    <Layout>
      <Quizimg>흑백 사진</Quizimg>
      <Title>{title}</Title>
      <Context>{content}</Context>
    </Layout>
  )

}