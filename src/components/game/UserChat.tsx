import styled from "styled-components"
import { UserCard } from "./UserCard"

const Layout = styled.div`
  grid-column: 1/13;
  min-width: 500px;
  height: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;
  background-color: white;

`

interface User{
  userId:number,
  position:number,
  nickname:string,
  role:string
}

export const UserChat = () => {
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