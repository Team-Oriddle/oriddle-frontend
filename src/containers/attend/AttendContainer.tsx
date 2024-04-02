import { ChatInput } from "@/components/attend/ChatInput";
import { ChatList } from "@/components/attend/ChatLIst";
import { EditRoomInfo } from "@/components/attend/EditRoomInfo";
import { StartGameButton } from "@/components/attend/StartGameButton";
import { UserList } from "@/components/attend/UserList";
import { Header } from "@/components/header/Header";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh; // Viewport Height
  width: 100vw; // Viewport Width
  min-width: 100vw;
  background-color: white;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`
const UserControllerLayout = styled.div`
  grid-column: 1/10;
`

const HostControllerLayout = styled.div`
  grid-column: 10/13;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AttendContainer: React.FC = () => {

  return (
    <Container>
      <Wrapper>
        <Header></Header>
        <UserControllerLayout>
          {/* 유저만 컨트롤 가능한 레이아웃 */}
          <UserList></UserList>
          <ChatList></ChatList>
          <ChatInput></ChatInput>
        </UserControllerLayout>
        <HostControllerLayout>
          <EditRoomInfo></EditRoomInfo>
          <StartGameButton></StartGameButton>
        </HostControllerLayout>
      </Wrapper>
    </Container>
  );
};

export default AttendContainer;
