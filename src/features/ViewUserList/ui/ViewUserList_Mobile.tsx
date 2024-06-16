import styled from "styled-components"
import { ViewUser_Mobile } from "./ViewUser_Mobile"


const Layout = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 4fr);
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
  color:number
}

export const ViewUserList_Mobile = ({UserList}:UserListProps) => {
  return(
    <Layout>
      {UserList.map((user:IUser)=> (
        <ViewUser_Mobile
          key={user.position} 
          usernickname={user.nickname} 
          userColor={user.color}
        ></ViewUser_Mobile>
      ))}
    </Layout>
  )
}