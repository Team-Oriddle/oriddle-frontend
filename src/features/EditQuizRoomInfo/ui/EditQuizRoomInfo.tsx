import styled from "styled-components"


export const EditQuizRoomInfo = () =>{
  return(
    <Layout>
      <Header>
        <HeaderItem>
          퀴즈 방 정보
          <div>설정</div>
        </HeaderItem>
      </Header>
      <Body>
        <Text>퀴즈 제목 :</Text>
        <Text>최대 인원 : </Text>
        <Text>공개 여부 :</Text>
        <Text>비밀 번호 :</Text>
      </Body>
    </Layout>
  )
}

const Layout = styled.div`
  width: 342px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`

const Header = styled.div`
  width:100%;
  height: 50px;
  font-size: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
  padding-left: 100px;

`

const Body = styled.div`
  width:100%;
  height: 250px;
  background-color: white;
  border-bottom-left-radius:10px;
  border-bottom-right-radius:10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0px 30px;
`
const Text = styled.div`
  margin: 12px;
`

const HeaderItem = styled.div`
  width: 210px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
`