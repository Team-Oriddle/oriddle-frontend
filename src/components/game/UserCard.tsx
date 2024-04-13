import styled from "styled-components"


const Layout = styled.div`
  width: 159px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: white;
`

const Chatting = styled.div`
  width: 100%;
  height: 110px;
  background-color: white;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom:20px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 10px;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    border-right: 0;
    transform: translate(0, 100%);
  }
`

const Character = styled.div`
  width: 100%;
  height: 175px;
  background-color: purple;
  border-radius: 10px;
`
const Text = styled.div`
  font-size: 20px;
  font-weight: medium;
  color: black;
`


interface UserCardProps{
  usernickname:string,
  score:number
}

export const UserCard = ({usernickname,score}:UserCardProps) => {
  return(
    <Layout>
      <Chatting>
        {/* TODO: 백엔드 채팅 기능 추가되면 추가 */}
      </Chatting>
      <Character>

      </Character>
      <Text>
        {usernickname}
      </Text>
      <Text>
        {score}점
      </Text>
    </Layout>
  )
}