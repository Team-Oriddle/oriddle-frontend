import styled from "styled-components"

const Layout = styled.div`
  height: 70px;
  border-radius: 50px;
  background-color: purple;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: white;
`
export const StartGameButton = () => {

  return(
    <Layout>
      게임 시작
    </Layout>
  )
}