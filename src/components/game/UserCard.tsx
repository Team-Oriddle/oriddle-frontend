import styled from "styled-components"

interface Props{
  usernickname:string,
}

const Layout = styled.div`
  width: 159px;
  height: 350px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: purple;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: white;

`


export const UserCard = ({usernickname}:Props) => {
  return(
    <Layout>
      {usernickname}
    </Layout>
  )
}