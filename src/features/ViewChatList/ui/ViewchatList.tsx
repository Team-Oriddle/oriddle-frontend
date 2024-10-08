import { ChatData } from "@/shared/type";
import { SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";

const Layout = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  margin-bottom: 20px;
  height: 300px;
  color: black;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  margin-right: 12px;
  color: black;
  overflow-y: auto;
  font-size: 22px;
  position: relative;
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

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

type ChatListProps = {
  OpenChatList:(value: SetStateAction<boolean>) => void,
  width:number,
  chatList: ChatData[]
}

export const ViewChatList = ({ OpenChatList, width, chatList }: ChatListProps) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(chatList);
  }, [chatList]);

  return (
    <Layout width={width}>
      {OpenChatList !== null ? (
        <CloseButton onClick={() => OpenChatList(false)}>닫기</CloseButton>
      ) : null}
      <ChatContainer>
        {chatList.map((chat: any, index: number) => (
          <ChatMessage key={index}>
            <ChatNickname>{chat.nickname}:</ChatNickname>
            <ChatContent>{chat.content}</ChatContent>
          </ChatMessage>
        ))}
        <div ref={chatEndRef} />
      </ChatContainer>
    </Layout>
  );
};
