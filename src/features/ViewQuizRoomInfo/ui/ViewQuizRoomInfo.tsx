import styled from "styled-components"

type QuizRoomInfoProps ={
  OpenModal:() => void,
  maxParticipant:number,
  quizTitle:string
  leave:() => void
}

export const ViewQuizRoomInfo = ({OpenModal, maxParticipant, quizTitle,leave}) =>{
  return(
    <Layout>
      <Header>
        <HeaderItem>
          <div onClick={leave}>나가기</div>
          퀴즈 방 정보
          <div onClick={OpenModal}>설정</div>
          {/* TODO: 유저가 방장인 경우에만 버튼이 able하게 */}
        </HeaderItem>
      </Header>
      <Body>
        <Text>퀴즈 제목 : {quizTitle}</Text>
        <Text>최대 인원 : {maxParticipant}</Text>
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
  width: 100%;
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
  width: 100%;
  padding: 0px 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
`