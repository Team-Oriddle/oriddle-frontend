import styled from "styled-components"

const Layout = styled.div`
  grid-column: 5/9;
  background-color: white;
  height: 320px;
  color: black;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin: 20px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));

`

export const QuizSource = () => {
  
  return(
    <Layout>
      Source
    </Layout>
  )
}