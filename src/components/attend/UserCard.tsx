import styled from "styled-components"

const Layout = styled.div`
  width: 163px;
  height: 400px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));

`

const UserImage = styled.div`
  width: 163px;
  height: 250px;
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
      <UserImage>
        유저 캐릭터 이미지 
      </UserImage>
      <UserInfo>
        {usernickname}
      </UserInfo>
    </Layout>
  )
}