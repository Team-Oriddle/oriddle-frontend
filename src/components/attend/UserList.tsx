import styled from "styled-components"
import { UserCard } from "./UserCard"

const Layout = styled.div`
  min-width: 1074px;
  height: 400px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 20px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`


type UserListProps = {
  UserList: IUser[]
}

interface IUser{
  userId:number,
  position:number,
  nickname:string,
  isHost:boolean
}

export const UserList = ({UserList}:UserListProps) => {
  return(
    <Layout>
      {UserList.map((user:IUser)=> (
        <UserCard key={user.position} usernickname={user.nickname}></UserCard>
      ))}
    </Layout>
  )
}