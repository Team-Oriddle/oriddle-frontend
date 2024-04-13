import { ChatInput } from "@/components/attend/ChatInput";
import { ChatList } from "@/components/attend/ChatLIst";
import { EditRoomInfo } from "@/components/attend/EditRoomInfo";
import { UserList } from "@/components/attend/UserList";
import { Header } from "@/components/header/Header";
import getQuizRoomData from "@/entities/quizroom/api/getQuizRoomData";
import { initializeSocket } from "@/entities/socket/socket";
import { StartGame } from "@/features/StartGame/ui/StartGame";
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

type Props = {
  roomId :number
}

interface UserData{
  nickname:string,
  position: number,
  userId:number,
  isHost:Boolean
}

export const QuizRoomPage = ({roomId}:Props) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData[]>([]); 
  //TODO: 추후에 채팅기능 추가되면 채팅 기능 관련 기능도 추가
  //const [chatList, setChatList] = useState([]); //
  const [quizData, setQuizData] = useState([]);
  //TODO: 백엔드에셔 연결 끊김에 대한 처리가 결정된 이후에 응답에 따라 소켓 연결을 시도할지 결정
  const [isConnect,  setIsConnect] = useState<Boolean>(true);

  useEffect(() => {
    const joinGame = async (quizRoomId:number) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/join`, {
          method: 'POST',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error:any) {
        if (error.message === 'HTTP error! status: 401') {
          console.log('401');
          const redirectEndPoint = encodeURIComponent(`/attend/${quizRoomId}`);
          window.location.href = `http://localhost:8080/api/v1/login/google?redirectEndPoint=${redirectEndPoint}`;
        }
        console.log(error);
      }
    };
    
    joinGame(roomId);
    getQuizRoomData(roomId).then((result)=>{ 
      setQuizData(result)
      setUserData(result.participants)
    });
  }, [roomId]);

  useEffect(()=>{
    const getSocket = (quizRoomId:number) => {
      const subscriptions = [
        //strictMode가 켜져 있는 경우 제대로 작동하지 않음
        { topic: `/topic/quiz-room/${quizRoomId}/join`, callback:(message:any) =>{
          let newUser = {...message, isHost:false}
          setUserData([...userData,newUser])
          userData.sort(function(a,b){
            return a.position-b.position
          })
        }},
        //strictMode가 켜져 있는 경우 제대로 작동하지 않음
        { topic: `/topic/quiz-room/${quizRoomId}/leave`, callback:(message:any) =>{
          const findIndex = message.userId;
          const copyUserData = userData
          const removeUserData = copyUserData.findIndex(player => player.userId === findIndex)
          if (removeUserData !== -1) {
            copyUserData.splice(removeUserData, 1);
          }
          setUserData(copyUserData);
        }},
        { topic: `/topic/quiz-room/${quizRoomId}/start`, callback:(message:any) =>{
          router.push(`/quiz/game/${quizRoomId}`)
        }},
      ]
      initializeSocket('ws://localhost:8080/ws', subscriptions)
    }

    getSocket(8)
  },[isConnect])

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
          <StartGame roomId={roomId}></StartGame>
        </HostControllerLayout>
      </Wrapper>
    </Container>
  );
};
