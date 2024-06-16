import styled from "styled-components";
import { UserCard } from "./UserCard";
import { ChatData, UserData } from "@/shared/type";
import { ViewChatbyUser_Mobile } from "@/features/ViewChatInGame/ui/ViewChatbyUser_Mobile";

const Layout = styled.div`
  width: 90%;
  height: 280px;
  display: grid;
  grid-template-columns: repeat(2, 4fr);
  gap: 10px;
  background-color: white;
`;

interface UserChatProps {
  UserList: UserData[];
  currentChat: ChatData | null;
}

export const UserChatInGame_Mobile = ({ UserList, currentChat }: UserChatProps) => {
  return (
    <Layout>
      {UserList.map((user) => {
        const userChat = currentChat && currentChat.nickname === user.nickname ? currentChat.content : "";
        return (
          <ViewChatbyUser_Mobile
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