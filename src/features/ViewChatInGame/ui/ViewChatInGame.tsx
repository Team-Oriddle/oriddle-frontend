import styled from "styled-components";
import { ChatData, UserData } from "@/shared/type";
import { UserCard } from "@/components/game/UserCard";
import { ViewChatbyUser } from "./ViewChatbyUser";

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
  return (
    <Layout>
      {UserList.map((user) => {
        const userChat = currentChat && currentChat.nickname === user.nickname ? currentChat.content : "";
        return (
          <ViewChatbyUser
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