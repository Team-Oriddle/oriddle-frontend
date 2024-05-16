import { ChatInput } from "@/components/attend/ChatInput";
import { ChatList } from "@/components/attend/ChatLIst";
import { EditRoomInfo } from "@/components/attend/EditRoomInfo";
import { UserList } from "@/components/attend/UserList";
import { Header } from "@/components/header/Header";
import { getQuizRoomData } from "@/entities/quizroom";
import { initializeSocket } from "@/entities/socket/socket";
import { StartGameButton } from "@/features/StartGameButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';


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



const LoadingUI = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1070px;
  font-size: 72px;
  font-weight: bolder;
  color:  #643DD2;;
`

const LeaveRoom = styled.div`
  height: 70px;
  border-radius: 50px;
  background-color: purple;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: white;
  cursor: pointer;

`


type QuizRoomProps = {
  QuizroomId :number
}

interface UserData{
  nickname:string,
  position: number,
  userId:number,
  isHost:Boolean
}

//TODO: isLoading처리
export const QuizRoomPage = ({QuizroomId}:QuizRoomProps) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData[]>([]); 
  //TODO: 추후에 채팅기능 추가되면 채팅 기능 관련 기능도 추가
  //const [chatList, setChatList] = useState([]); //
  const [quizData, setQuizData] = useState([]);
  //TODO: 백엔드에셔 연결 끊김에 대한 처리가 결정된 이후에 응답에 따라 소켓 연결을 시도할지 결정
  const [isConnect,  setIsConnect] = useState<Boolean>(false);
  const [ loadingText, setLoadingText ] = useState("Loading")

  useEffect(()=>{
    const interval = setInterval(()=>{
      setLoadingText((prev)=>{
        if(prev.length < 10) return prev+"."
        return "Loading"
      })
    },500)
    return ()=>  clearInterval(interval)
  },[])


  const LeaveThisRoom =async (quizRoomId: string) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/leave`,{},{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // TODO: JoinGame을 feature로 변경해야하는지 추후에 고민
    const joinGame = async (quizRoomId: number) => {
      try {
        const response = await axios.post(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/join`, {}, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status !== 200) {
          throw new Error(`error! status: ${response.status}`);
        }
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status !== 409) {
          console.log('401');
          const redirectEndPoint = encodeURIComponent(`/quiz/room/${quizRoomId}`);
          window.location.href = `http://localhost:8080/api/v1/login/google?redirectEndPoint=${redirectEndPoint}`;
        }
      }
    };
  
    joinGame(QuizroomId);
  
    getQuizRoomData(QuizroomId).then((result) => {
      setQuizData(result);
      setUserData(result.participants);
      setIsConnect(true);
    });
  }, []);
  

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

    getSocket(QuizroomId)
  },[isConnect])

  return (
    <Container>
      <Wrapper>
        <Header></Header>

          <UserControllerLayout>
          {/* 유저만 컨트롤 가능한 레이아웃 */}
          {
          userData.length === 0 ? <LoadingUI>{loadingText}</LoadingUI> 
          :
            <UserList UserList={userData}></UserList>
          }
            <ChatList></ChatList>
            <ChatInput></ChatInput>
          </UserControllerLayout>

        <HostControllerLayout>
          <EditRoomInfo></EditRoomInfo>
          <LeaveRoom onClick={()=>LeaveThisRoom(QuizroomId)}>방나가기</LeaveRoom>
          <StartGameButton roomId={QuizroomId}></StartGameButton>
        </HostControllerLayout>
      </Wrapper>
    </Container>
  );
};
