import styled from "styled-components";
import { UserCard } from "./UserCard";
import { ChatData, UserData } from "@/shared/type";

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

export const UserChatInGame = ({ UserList, currentChat }: UserChatProps) => {
  

  return (
    <Layout>
      {UserList.map((user) => {
        const userChat = currentChat && currentChat.nickname === user.nickname ? currentChat.content : "";
        return (
          <UserCard
            key={user.position}
            color={user.color}
            usernickname={user.nickname}
            score={user.score}
            chatMessage={userChat}
          />
        );
      })}
    </Layout>
  );
};