import styled from "styled-components"

const Container = styled.div`
  width: 220px;
  height: 124px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  margin-bottom: 12px;
`

export const AddQuizFromCreatePage = ({addQuiz}:any) =>{
  return(
    <Container onClick={()=>addQuiz()}>
      +
    </Container>
  )
}