import { sendMessage } from "@/entities/socket/socket";
import { useState } from "react";
import styled from "styled-components"


const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1440px;
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

type SendMessageProps = {
  quizGameId :number
}

export const SendMessage = ({quizGameId }:SendMessageProps) =>{
  const ENTER = 'Enter'
  const [input, setInput] = useState('');

  const handleInputChange = (event:any) => {
    setInput(event.target.value);
  };

  const handelSendClick = () =>{
    console.log(quizGameId+'로 전달 진행')
    if (input.trim() !== '') {
      sendMessage(`/app/quiz-room/${quizGameId}/chat`, { content: input });
      sendMessage(`/app/quiz-room/${quizGameId}/check-answer`, { answer: input });
      setInput('');
    }
    console.log('전달 완료')
  }

  const handleKeyPress = (event) => {
    if(event.key === ENTER) {
      event.preventDefault()
      handelSendClick()
    }
  }

  

  return(
    <Layout>
      <ChattingInput
        placeholder="정답을 입력해주세요"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      >
      </ChattingInput>
      <Button onClick={handelSendClick}>전송</Button>
    </Layout>
  )
}