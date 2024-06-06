import { sendMessage } from "@/entities/socket/socket";
import { SetStateAction, useState } from "react";
import styled from "styled-components";


type SendMessageProps = {
  OpenChatList:(value: SetStateAction<boolean>) => void,
  width: number;
  placeholder: string;
  quizGameId: string;
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export const SendMessage = ({ OpenChatList, width, placeholder, quizGameId }: SendMessageProps) => {
  const ENTER = 'Enter';
  const [input, setInput] = useState('');

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
  };

  const sendClick = () => {
    console.log(quizGameId + '로 전달 진행');
    if (input.trim() !== '') {
      sendMessage(`/app/quiz-room/${quizGameId}/chat`, { content: input });
      sendMessage(`/app/quiz-room/${quizGameId}/check-answer`, { answer: input });
      setInput('');
    }
    console.log('전달 완료');
  };

  const debouncedSendClick = debounce(sendClick, 100);

  const handleKeyPress = (event) => {
    if (event.key === ENTER) {
      event.preventDefault();
      debouncedSendClick();
    }
  };


  return (
    <Layout width={width}>
      <ChattingInput
        placeholder={placeholder}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <Buttonlayout>
        {
          OpenChatList  !== null 
          ? 
          <HamburgerButton onClick={()=>OpenChatList(true)}>햄버거</HamburgerButton> 
          : 
          null
        }
        <Button onClick={debouncedSendClick}>전송</Button>
      </Buttonlayout>
    </Layout>
  );
};
const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${(props) => props.width}px;
  height: 70px;
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  :focus{
    outline: none;
  }
`;

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
  border-bottom-right-radius:10px;
  border-top-right-radius:10px;
`;

const ChattingInput = styled.input`
  width: 100%;
  font-size: 22px;
  background-color: white;
  border: none;
  color: black;
  margin-left: 30px;
`;  

const Buttonlayout = styled.div`
  display: flex;
  flex-direction: row;
`

const HamburgerButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px;
`