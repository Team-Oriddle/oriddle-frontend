import styled from "styled-components"
import { QuizCard } from "./QuizCard"

//생각해아할 부분 퀴즈 컨트롤러 컴포넌트로 따로 뺴서 valueChange로 관리할것인지
//아니면 그냥 여기서 관리할 것 인지 고민하고 결정

interface Quiz{
  id:number
  title:string,
  content:string
}

const Layout = styled.div`
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  align-items: end;
`

const QuizLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
  row-gap: 20px;
`
const QuizListController = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`

export const QuizList = () => {
  const QuizLists:Quiz[] = [
    {
      id:0,
      title:'제목제목제목제목제목제목제목제목제목제목',
      content:'내용'
    },
    {
      id:1,
      title:'제목',
      content:'내용'
    },
    {
      id:2,
      title:'제목',
      content:'내용'
    },
    {      
      id:3,
      title:'제목',
      content:'내용'
    },
    {
      id:0,
      title:'제목',
      content:'내용'
    },
    {
      id:1,
      title:'제목',
      content:'내용'
    },
    {
      id:2,
      title:'제목',
      content:'내용'
    },
    {      
      id:3,
      title:'제목',
      content:'내용'
    },
    {
      id:0,
      title:'제목',
      content:'내용'
    },
    {
      id:1,
      title:'제목',
      content:'내용'
    },
    {
      id:2,
      title:'제목',
      content:'내용'
    },
    {      
      id:3,
      title:'제목',
      content:'내용'
    }
  ]

  return(
    <Layout>
      <QuizListController>
      인기순 | 최신순 | 이름순
      </QuizListController>
      <QuizLayout>
        {QuizLists.map((quiz) =>(
          <QuizCard key={quiz.id} title={quiz.title} content={quiz.content}></QuizCard>
        ))}
      </QuizLayout>
    </Layout>
  )
}