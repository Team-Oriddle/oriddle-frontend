import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Duck1 from '../../../public/user/duck1.png';
import Duck2 from '../../../public/user/duck2.png';
import Duck3 from '../../../public/user/duck3.png';
import Duck4 from '../../../public/user/duck4.png';
import Duck5 from '../../../public/user/duck5.png';
import Duck6 from '../../../public/user/duck6.png';
import Duck7 from '../../../public/user/duck7.png';
import Duck8 from '../../../public/user/duck8.png';

const Layout = styled.div`
  width: 163px;
  height: 400px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`;

const UserImageWrapper = styled.div`
  width: 163px;
  height: 250px;
  border-radius: 20px;
  position: relative;
`;

const UserInfo = styled.div`
  width: 163px;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
`;

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

export const UserCard = ({ usernickname, userColor }) => {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    setUserImage(getUserImage(userColor));
  }, [userColor]);

  return (
    <Layout>
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
      <UserInfo>{usernickname}</UserInfo>
    </Layout>
  );
};
