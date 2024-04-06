import { ChatInput } from "@/components/attend/ChatInput";
import { ChatList } from "@/components/attend/ChatLIst";
import { EditRoomInfo } from "@/components/attend/EditRoomInfo";
import { StartGameButton } from "@/components/attend/StartGameButton";
import { UserList } from "@/components/attend/UserList";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import styled from "styled-components";
import StompJs from '@stomp/stompjs';
import axios from "axios";
import ChatSocket from "@/socket/Chatsocket";
import { useRouter } from "next/navigation";


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
  quizId :number
}

const AttendContainer = ({roomId}:Props) => {
  const navigate = useRouter();
  const [userData, setUserData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [chatSocket, setChatSocket] = useState(null);

  const quizRoomId = roomId; // Assuming `id` is the quiz room ID from the route parameter

  // const alignedUserData = useMemo(() => userData.sort((a, b) => a.position - b.position), [userData]);

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
        getQuizData(quizRoomId);
        console.log(response);
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          console.log('401');
          const redirectEndPoint = encodeURIComponent(`/attend/${quizRoomId}`);
          window.location.href = `http://localhost:8080/api/v1/login/google?redirectEndPoint=${redirectEndPoint}`;
        }
        console.log(error);
      }
    };

    const getQuizData = async (quizRoomId:number) => {
      console.log('시작')
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        setUserData(response.data.data.participants);
        setQuizData(response.data.data);
        const newChatSocket = new ChatSocket(
          quizRoomId, 
          navigate,
          userData, 
          setUserData // Assuming ChatSocket adapted for React and uses setUserData for updating participant list
        );
        setChatSocket(newChatSocket);
      } catch (error) {
        console.error(error);
      }
    };

    joinGame(quizRoomId);
  }, [quizRoomId, navigate, userData]);
  //관리 해야할 정보
  //1. 유저 정보
  //2. 퀴즈 방 정보
  //3. 채팅 정보

  //useEffect로 로그인 유무 파악후
  //로그인 안되어 있으면 로그인 페이지로 리다이렉트 보내고 

  //로그인 되어있으면 참가 API 보내고
  //참가 성공하면 그 뒤에 퀴즈에 대해서 API요청

  //소켓 연결은 Param에서 받아와서 연결 시도
  //소켓에서 굳이 퀴즈 정보를 건드릴 이유가 없음
  //기존 소켓에 존재하던 유저 정보, 퀴즈 정보, 퀴즈 정답등을 외부로 뺴냄
  // const client = new StompJs.Client({
  //   brokerURL : "ws://localhost:8080/ws",
  //   beforeConnect() {
  //       console.log("beforeConnect")
  //   },
  //   connectHeaders:{
  //     //null
  //   },
  //   debug(str){
  //     console.log('dedug',str)
  //   },
  //   reconnectDelay: 50000,//자동 재연결,
  //   heartbeatIncoming:4000,//임의 값
  //   heartbeatOutgoing:4000,//임의 값
  // })



  //그렇다면 어떻게 할꺼임?

  //onConnected()인 경우
  //기존에는 연결성공을 띄워주고 구독을 진행했음
  // client.onConnect = function(frame){
  //   client.subscribe(`/topic/quiz-room/quizRoomId/join`, message =>{
  //     //여기서 적당힌 처리
  //   })
  // }

  //join의 경우
  //join 메세지가 온 경우 사용자가 추가가 되고
  // 포지션 별로 정렬릉 한번 해주게 된다

  //leave의 경우는 아이디를 찾아서 제거하게 된다

  //question의 경우 질문이 날라오게된다

  //answer의 경우 정답을 맞춘이와 점수가 날라오게된다

  //time-out의 경우 타임이 오버되었을떄 정답을 알려준다ㄱ

  //chat의 경우 메세지가 오면 보여준다

  //여기와 연관된 entities는 퀴즈 데이터, 참가자 데이터, 점수, 채팅 데이터 등이 있다.
  

  //const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`,{
  //여기로 퀴즈 정보 요청하고 퀴즈 정보 받으면 그때 뿌려주고
  //

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

export default AttendContainer;
