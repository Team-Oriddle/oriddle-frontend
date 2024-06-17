import styled from "styled-components";
import { ChatData, UserData } from "@/shared/type";
import { ViewChatbyUser } from "./ViewChatbyUser";
import { useEffect, useState } from "react";

const Layout = styled.div`
  width: 1440px;
  min-width: 500px;
  height: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;
  background-color: white;
`;

interface UserChatProps {
  UserList: UserData[];
  currentChat: ChatData | null;
}

export const ViewChatInGame = ({ UserList, currentChat }: UserChatProps) => {
  const [userChats, setUserChats] = useState<{ [key: string]: ChatData[] }>({});

  useEffect(() => {
    if (currentChat) {
      setUserChats((prevChats) => {
        const userChatList = prevChats[currentChat.nickname] || [];
        return { ...prevChats, [currentChat.nickname]: [...userChatList, currentChat] };
      });
    }
  }, [currentChat]);

  return (
    <Layout>
      {UserList.map((user) => {
        return (
          <ViewChatbyUser
            key={user.position}
            color={user.color}
            usernickname={user.nickname}
            score={user.score}
            chatMessages={userChats[user.nickname] || []}
          />
        );
      })}
    </Layout>
  );
};
