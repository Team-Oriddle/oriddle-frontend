import styled from "styled-components";
import { useEffect, useState } from "react";
import Duck1 from '../../../public/userInGame/duck1.png'
import Duck2 from '../../../public/userInGame/duck2.png'
import Duck3 from '../../../public/userInGame/duck3.png'
import Duck4 from '../../../public/userInGame/duck4.png'
import Duck5 from '../../../public/userInGame/duck5.png'
import Duck6 from '../../../public/userInGame/duck6.png'
import Duck7 from '../../../public/userInGame/duck7.png'
import Duck8 from '../../../public/userInGame/duck8.png'
import Image from "next/image";

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
    content: "";
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

const UserImageWrapper = styled.div`
  width: 100%;
  height: 175px;
  border-radius: 10px;
  position: relative;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: medium;
  color: black;
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
`;

interface UserCardProps {
  usernickname: string;
  score: number;
  chatMessage: string;
  color: number;
}

const getUserImage = (userColor) => {
  switch (userColor) {
    case 1: return Duck1;
    case 2: return Duck2;
    case 3: return Duck3;
    case 4: return Duck4;
    case 5: return Duck5;
    case 6: return Duck6;
    case 7: return Duck7;
    case 8: return Duck8;
    default: return null;
  }
};

export const UserCard = ({
  usernickname,
  score,
  chatMessage,
  color,
}: UserCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    console.log(chatMessage);
    if (chatMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [chatMessage]);


  useEffect(() => {
    setUserImage(getUserImage(color));
  }, [color]);

  return (
    <Layout>
      <Chatting isVisible={isVisible}>
        <div>{chatMessage}</div>
      </Chatting>
      <UserImageWrapper>
      {userImage ? (
          <StyledImage
            src={userImage}
            alt="User Image"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div>No Image</div> // Add fallback for no image
        )}
      </UserImageWrapper>
      <Text>{usernickname}</Text>
      <Text>{score}점</Text>
    </Layout>
  );
};
