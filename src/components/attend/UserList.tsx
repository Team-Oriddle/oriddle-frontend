import styled from "styled-components"
import { UserCard } from "./UserCard"

const Layout = styled.div`
  min-width: 1074px;
  height: 400px;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 27px;
  padding-right: 27px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px 20px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`

interface User{
  userId:number,
  position:number,
  nickname:string,
  role:string
}

export const UserList = ({UserList}:User[]) => {
  
  return(
    <Layout>
      {UserList.map((user)=> (
        <UserCard key={user.position} usernickname={user.nickname}></UserCard>
      ))}
    </Layout>
  )
}