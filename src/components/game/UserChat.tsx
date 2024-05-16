import styled from "styled-components";
import { UserCard } from "./UserCard";

const Layout = styled.div`
  grid-column: 1/13;
  min-width: 500px;
  height: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;
  background-color: white;
`;

interface User {
  userId: number;
  position: number;
  nickname: string;
  role: string;
  score: number;
}

interface ChatType {
  user: string;
  chat: string;
}

interface UserChatProps {
  UserList: User[];
  currentChat: ChatType | null;
}

export const UserChat = ({ UserList, currentChat }: UserChatProps) => {
  return (
    <Layout>
      {UserList.map((user) => {
        const userChat = currentChat && currentChat.nickname === user.nickname ? currentChat.content : "";
        return (
          <UserCard
            key={user.position}
            usernickname={user.nickname}
            score={user.score}
            chatMessage={userChat}
          />
        );
      })}
    </Layout>
  );
};