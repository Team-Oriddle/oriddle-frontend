import { useEffect, useRef } from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: ${(props) => props.width}px;
  margin-bottom: 20px;
  height: 300px;
  background-color: white;
  color: black;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  margin-right: 12px;
  color: black;
  overflow-y: auto;
  font-size: 22px;
`;

const ChatMessage = styled.div`
  padding: 10px;
  display: flex;
`;

const ChatNickname = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ChatContent = styled.div`
  font-size: 22px;
`;

export const ChatList = ({ width, chatList }: any) => {

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(chatList)
  }, [chatList]);

  return (
    <Layout width={width}>
      {chatList.map((chat: any, index: number) => (
        <ChatMessage key={index}>
          <ChatNickname>{chat.nickname}:</ChatNickname>
          <ChatContent>{chat.content}</ChatContent>
        </ChatMessage>
      ))}
      <div ref={chatEndRef} />
    </Layout>
  );
};
