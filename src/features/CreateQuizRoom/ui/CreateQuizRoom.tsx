import axios from "axios"
import { error } from "console"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styled from "styled-components"

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


export const CreateQuizRoom = () =>{
  const navigate = useRouter();
  const [ userNumber, setUserNumber ] = useState<number>(2);
  const [ roundTime, setRoundTime  ] = useState<number>(10);
  const [ quizRoomTitle, setQuizRoomTitle ] = useState<string>('')

  const handleUserSlider = (e:any) =>{
    setUserNumber(e.target.value)
  }

  const handleRoundSlider = (e:any) =>{
    setRoundTime(e.target.value)
  }

  const PostQuRoom =async (QuizId:any) => {
    const response  = await axios.post(`http://localhost:8080/api/v1/quiz-room`,{

    })
  }

  const PostQuizRoom = async (QuizId:any) =>{
    await fetch(`http://localhost:8080/api/v1/quiz-room`,{
      method:'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "quizId" : QuizId, // NotNull
        "title": quizRoomTitle, // NotNull, 20자 이하, 공백 불가능          
        "max_participant": userNumber // NotNull, 2이상 8이하
      })
    }).then((response)=>{
      console.log(response)
    }
    ).catch((error)=>{
      console.log(error)
    })
  }

  return(
    <Layout>
      <Wrapper>
        <ModalClose>X</ModalClose>
        <TextInput onChange={(e)=>setQuizRoomTitle(e.target.value)} placeholder="제목을 입력해주세요"></TextInput>
        {/* TODO: 입력 제한*/}
        <TextInput type="password" placeholder="비밀번호"></TextInput>
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
          <input type="range" min="2" max="8" onChange={handleUserSlider}>
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
          <input type="range" min="30" max="200" onChange={handleRoundSlider}>
          </input>
        </RoundInput>
        <CreateButton onClick={()=>PostQuizRoom(8)}>방 만들기</CreateButton>
      </Wrapper>
    </Layout>
  )
}