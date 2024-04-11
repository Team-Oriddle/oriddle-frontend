import { ChatInput } from "@/components/attend/ChatInput";
import { ChatList } from "@/components/attend/ChatLIst";
import { EditRoomInfo } from "@/components/attend/EditRoomInfo";
import { StartGameButton } from "@/components/attend/StartGameButton";
import { UserList } from "@/components/attend/UserList";
import { Header } from "@/components/header/Header";
import getQuizRoomData from "@/entities/quizroom/api/getQuizRoomData";
import { initializeSocket } from "@/entities/socket/socket";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh; // Viewport Height
  width: 100vw; // Viewport Width
  min-width: 100vw;
  background-color: white;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`
const UserControllerLayout = styled.div`
  grid-column: 1/10;
`

const HostControllerLayout = styled.div`
  grid-column: 10/13;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Props{
  roomId :number
}

interface UserData{
  nickname:string,
  position: number,
  userId:number,
  isHost:Boolean
}

const QuizRoomPage = ({roomId}:Props) => {
  const navigate = useRouter();
  const [userData, setUserData] = useState<UserData[]>([]); 
  const [chatList, setChatList] = useState([]); //
  const [quizData, setQuizData] = useState([]); // fetchData에서 추가로 지정가능
  const [loading, setLoading] = useState<Boolean>(true);

  const quizRoomId = roomId;

  useEffect(() => {
    //로직 변경됨 기존에는 로그인시 로그인하고 있어도 에러를 안잡았는데 이번에는 잡음
    const joinGame = async (quizRoomId:number) => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/quiz-room/${quizRoomId}/join`,
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response);
      } catch (error:any) {
        if (error.message === 'Request failed with status code 401') {
          console.log('401');
          const redirectEndPoint = encodeURIComponent(`/attend/${quizRoomId}`);
          window.location.href = `http://localhost:8080/api/v1/login/google?redirectEndPoint=${redirectEndPoint}`;
        }
        console.log(error);
      }
      fetchData(quizRoomId)//참가 성공하면 보내야함 추후에 수정
    };
    
    //fetchData 함수에서 모든 API호출 관리 
    const fetchData = async (quizRoomId:number) => {
      try {
        const quizData = await getQuizRoomData(quizRoomId);
        console.log(quizData)
        setUserData(quizData.data.participants)        
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    };


    joinGame(8);
    //
  }, [quizRoomId]);

  useEffect(()=>{
    const getSocket = (quizRoomId:number) => {
      const subscriptions = [
        { topic: `/topic/quiz-room/${quizRoomId}/join`, callback:(message) =>{
          let newUser = {...message, isHost:false}
          console.log(newUser)
          console.log(userData)//유저 데이터 비어있음
          setUserData([...userData,newUser])
          userData.sort(function(a,b){
            return a.position-b.position
          })
        }},
        { topic: `/topic/quiz-room/${quizRoomId}/leave`, callback:(message) =>{
          console.log(message)// 내부 로직 작성
          const findIndex = message.userId;
          const copyUserData = userData
          const removeUserData = copyUserData.findIndex(player => player.userId === findIndex)
          if (removeUserData !== -1) {
            copyUserData.splice(removeUserData, 1);
          }
          setUserData(copyUserData);
        }},
        { topic: `/topic/quiz-room/${quizRoomId}/start`, callback:(message) =>{
          console.log(message)//내부 로직 작성
        }},
      ]

      initializeSocket('ws://localhost:8080/ws', subscriptions)//소켓 연결
    }

    getSocket(8)
  },[loading])
  //leave의 경우는 아이디를 찾아서 제거하게 된다

  //question의 경우 질문이 날라오게된다

  //answer의 경우 정답을 맞춘이와 점수가 날라오게된다

  //time-out의 경우 타임이 오버되었을떄 정답을 알려준다

  //chat의 경우 메세지가 오면 보여준다
  return (
    <Container>
      <Wrapper>
        <Header></Header>
        <UserControllerLayout>
          {/* 유저만 컨트롤 가능한 레이아웃 */}
          <UserList UserList={userData}></UserList>
          <ChatList></ChatList>
          <ChatInput></ChatInput>
        </UserControllerLayout>
        <HostControllerLayout>
          <EditRoomInfo></EditRoomInfo>
          <StartGameButton></StartGameButton>
        </HostControllerLayout>
      </Wrapper>
    </Container>
  );
};


export default QuizRoomPage