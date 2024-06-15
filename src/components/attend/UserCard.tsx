import Image from "next/image"
import styled from "styled-components"
import Duck1 from "../../../public/userImage/Duck1.png"

const Layout = styled.div`
  width: 163px;
  height: 400px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));

`

const UserImageWrapper = styled.div`
  width: 163px;
  height: 250px;
  border-radius: 20px;
  position: relative;
`

const UserInfo = styled.div`
  width: 163px;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const UserCard = ({usernickname}:{usernickname:string}) => {
  

  return(
    <Layout>
      <UserImageWrapper>
        <Image
          src={Duck1}
          alt='User Image'
          layout='fill'
          objectFit='cover'
        /> 
      </UserImageWrapper>
      <UserInfo>
        {usernickname}
      </UserInfo>
    </Layout>
  )
}