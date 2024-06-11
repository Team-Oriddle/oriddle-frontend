import styled from "styled-components"

const Container = styled.div` 
  width: 220px;
  height: 124px;
  padding: 20px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Circle = styled.div`
  width: 56px;
  height: 56px; 
  background-color: #FD7400; 
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 28px; 
  margin: 34px 0px;
  text-align: center;
`

export const AddQuizFromCreatePage = ({addQuiz}:any) =>{
  return(
    <Container onClick={()=>addQuiz()}>
      <Circle>
        +
      </Circle>
    </Container>
  )
}