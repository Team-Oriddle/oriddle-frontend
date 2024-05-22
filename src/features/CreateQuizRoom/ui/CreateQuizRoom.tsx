import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styled from "styled-components"
import cookie from 'react-cookies';


const Layout = styled.div`
  width: 327px;
  height: 400px;
  border-radius: 20px;
  background-color: white;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 267px;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ModalClose = styled.div`
  font-size: 15px;
  font-weight: 600;
  align-self: flex-end;
`

const TextInput = styled.input`
  font-size: 15px;
  font-weight: 600;
  background-color: white;
  color: black;
  border: none;
  :focus{
    border: none;
  }
`
const UserText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const PlayerInput = styled.div`
  display: flex;
  flex-direction: column;
`

const RoundInput = styled.div`
  display: flex;
  flex-direction: column;
`

const CreateButton = styled.div`
  align-self: flex-end;
  width: 98px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 15;
  font-weight: bold;
  color: white;
  background-color: #643DD2;
`

type Props = {
  quizId: number,
  handleModal: Function
}

const PostQuizRoom = async (QuizId: any, quizRoomTitle: string, userNumber: number, router: any) => {

  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/quiz-room',
      {
        quizId: QuizId,
        title: quizRoomTitle,
        maxParticipant: userNumber,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    router.push(`/quiz/room/${response.data.data.quizRoomId}`);
    // TODO: 페이지 이동 코드 작성
  } catch (error) {
    console.error(error);
    alert('방에 참가해있습니다!');
  }
};

export const CreateQuizRoom = ({ quizId, handleModal }: Props) => {
  const router = useRouter();
  const [userNumber, setUserNumber] = useState<number>(4);
  const [roundTime, setRoundTime] = useState<number>(10);
  const [quizRoomTitle, setQuizRoomTitle] = useState<string>('');

  const handleUserSlider = (e: any) => {
    setUserNumber(e.target.value);
  }

  const handleRoundSlider = (e: any) => {
    setRoundTime(e.target.value);
  }

  return (
    <Layout>
      <Wrapper>
        <ModalClose onClick={handleModal}>X</ModalClose>
        {/* TODO: 모달 닫을 수 있게 수정해아함 */}
        <TextInput onChange={(e) => setQuizRoomTitle(e.target.value)} placeholder="제목을 입력해주세요"></TextInput>
        {/* TODO: 입력 제한*/}
        <TextInput type="text" placeholder="비밀번호"></TextInput>
        {/* TODO: 입력 제한*/}
        <PlayerInput>
          <UserText>
            <div>
              플레이어
            </div>
            <div>
              {userNumber}
            </div>
          </UserText>
          <input type="range" min="2" max="8" value={userNumber} onChange={handleUserSlider}>
          </input>
        </PlayerInput>
        <RoundInput>
          <UserText>
            <div>
              퀴즈 제한 시간
            </div>
            <div>
              {roundTime}초
            </div>
          </UserText>
          <input type="range" min="30" max="200" value={roundTime} onChange={handleRoundSlider}>
          </input>
        </RoundInput>
        <CreateButton onClick={() => PostQuizRoom(quizId, quizRoomTitle, userNumber, router)}>방 만들기</CreateButton>
      </Wrapper>
    </Layout>
  )
}
