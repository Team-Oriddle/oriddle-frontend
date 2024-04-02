import styled from "styled-components"


const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  grid-column: 1/13;
  height: 70px;
  background-color: white;
  margin: 20px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`

// 나중에 reset.css 수정하고 버튼으로 변경
const Button = styled.div`
  width: 98px;
  height: 100%;
  background-color: gray;
  font-size: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ChattingInput = styled.input`
  width: 100%;
  font-size: 22px;
  background-color: white;
  border: none;
  color: black
`
;

export const ChatInput = () =>{
  return (
    <Layout>  
      <ChattingInput></ChattingInput>
      <Button>전송</Button>
    </Layout>
  )
}