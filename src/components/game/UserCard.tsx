import styled from "styled-components";
import { useEffect, useState } from "react";

const Layout = styled.div`
  width: 159px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: white;
`;

const Chatting = styled.div`
  width: 100%;
  height: 110px;
  color: black;
  background-color: white;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 10px;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    border-right: 0;
    transform: translate(0, 100%);
  }
    /* opacity: 1 */

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.2s;
`;

const Character = styled.div`
  width: 100%;
  height: 175px;
  background-color: purple;
  border-radius: 10px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: medium;
  color: black;
`;

interface UserCardProps {
  usernickname: string;
  score: number;
  chatMessage: string;
}

export const UserCard = ({ usernickname, score, chatMessage }: UserCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(chatMessage)
    if (chatMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [chatMessage]);

  return (
    <Layout>
      <Chatting isVisible={isVisible}>
        <div>{chatMessage}</div>
      </Chatting>
      <Character />
      <Text>{usernickname}</Text>
      <Text>{score}점</Text>
    </Layout>
  );
};