import styled from "styled-components"

const Layout = styled.div`
  grid-column: 1/13;
  background-color: white;
  height: 70px;
  color: black;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));

`

export const Question = () => {
  
  return(
    <Layout>
      [15/30] 다음 국기는 어느나라의 국기일까요? (객관식, 3점)
    </Layout>
  )
}