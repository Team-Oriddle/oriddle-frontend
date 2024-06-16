import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Duck1 from '../../../../public/userIngame/duck1.png';
import Duck2 from '../../../../public/userIngame/duck2.png';
import Duck3 from '../../../../public/userIngame/duck3.png';
import Duck4 from '../../../../public/userIngame/duck4.png';
import Duck5 from '../../../../public/userIngame/duck5.png';
import Duck6 from '../../../../public/userIngame/duck6.png';
import Duck7 from '../../../../public/userIngame/duck7.png';
import Duck8 from '../../../../public/userIngame/duck8.png';

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

export const ViewUser_Mobile = ({ usernickname, userColor }) => {
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
          <div>No Image</div>
        )}
      </UserImageWrapper>
      <UserInfo>{usernickname}</UserInfo>
    </Layout>
  );
};


const Layout = styled.div`
  width: 90%;
  height: 80px;
  border-radius: 20px;
  display: flex;
  margin: 16px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`;

const UserImageWrapper = styled.div`
  width: 50%;
  height: 90%;
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
  font-size: 12px;
  font-weight: bold;
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
`;