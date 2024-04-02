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

export const UserList = () => {
  const userList:User[] = [
    {
      "userId": 1,
      "position": 1,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
    {
      "userId": 2,
      "position": 2,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
    {
      "userId": 3,
      "position": 3,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
    {
      "userId": 4,
      "position": 4,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
    {
      "userId": 5,
      "position": 5,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
    {
      "userId": 6,
      "position": 6,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
    {
      "userId": 7,
      "position": 7,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
    {
      "userId": 8,
      "position": 8,
      "nickname": "닉네임1",
      "role" : "HOST"
    },
  ]
  
  return(
    <Layout>
      {userList.map((user)=> (
        <UserCard key={user.position} usernickname={user.nickname}></UserCard>
      ))}
    </Layout>
  )
}