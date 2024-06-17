import { Header } from "@/components/header/Header";
import { getQuizRoomData, startQuizRoom } from "@/entities/quizroom";
import { StartGameButton } from "@/features/StartGameButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useStomp } from "@/entities/socket/lib/SocketProvider";
import { SendMessage } from "@/features/SendMessage";
import { ViewQuizRoomInfo } from "@/features/ViewQuizRoomInfo/ui/ViewQuizRoomInfo";
import { QuizData, UserData } from "@/shared/type";
import { EditQuizRoomInfo } from "@/features/EditQuizRoomInfo/ui/EditQuizRoomInfo";
import { ViewUserList } from "@/features/ViewUserList";
import { MobileHeader } from "@/components/header/MobileHeader";
import { ViewUserList_Mobile } from "@/features/ViewUserList/ui/ViewUserList_Mobile";
import { ViewChatList } from "@/features/ViewChatList";
import { SendMessage_Mobile } from "@/features/SendMessage/ui/SendMessage_Mobile";
import { ViewChatList_Mobile } from "@/features/ViewChatList/ui/ViewchatList_Mobile";

type QuizRoomProps = {
  QuizroomId :string
  ResultId: string
}

export const QuizRoomPage = ({QuizroomId,ResultId}:QuizRoomProps) => {
  const router = useRouter();
  const {client, connected} = useStomp();
  const [userData, setUserData] = useState<UserData[]>([]); 
  const [chatList, setChatList] = useState([]); //
  const [quizData, setQuizData] = useState<QuizData|null>({
    "roomTitle": "",
    "quizTitle": "",
    "maxParticipant": 0,
    "participants": []
  });
  const [ isConnect,  setIsConnect] = useState<boolean>(false);
  const [ loadingText, setLoadingText ] = useState<string>("Loading")
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      setLoadingText((prev)=>{
        if(prev.length < 10) return prev+"."
        return "Loading"
      })
    },500)
    return ()=>  clearInterval(interval)
  },[])

  // const LeaveThisRoom =async (quizRoomId: string) => {
  //   try {
  //     const response = await axios.post(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/leave`,{},{
  //       withCredentials: true,
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     console.log(response)
  //     router.push('/')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    // TODO: JoinGame을 feature로 변경해야하는지 추후에 고민
    const joinGame = async (quizRoomId: string) => {
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
          const redirectEndPoint = encodeURIComponent(`/quiz/play/${quizRoomId}/room`);
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
  }, [connected]);

  

//TODO: 백엔드에셔 연결 끊김에 대한 처리가 결정된 이후에 응답에 따라 소켓 연결을 시도할지 결정

  const setSocketConnect = () => {
    if (client && connected) {
      const subscriptions = [];
      try {
        subscriptions.push(
          client.subscribe(`/topic/quiz-room/${QuizroomId}/start`, (message) => {
            router.push(`/quiz/play/${QuizroomId}/game`);
          })
        );
        subscriptions.push(
          client.subscribe(`/topic/quiz-room/${QuizroomId}/join`, (message) => {
            const socketData = JSON.parse(message.body);
            const newUser = { ...socketData };
            setUserData((prevUserData) => {
              const updatedUserData = [...prevUserData, newUser];
              updatedUserData.sort((a, b) => a.position - b.position);
              return updatedUserData;
            });
          })
        );
        subscriptions.push(
          client.subscribe(`/topic/quiz-room/${QuizroomId}/leave`, (message) => {
            const socketData = JSON.parse(message.body);
            const findIndex = socketData.userId;

            setUserData((prevUserData) => {
              const updatedUserData = [...prevUserData];
              const removeUserDataIndex = updatedUserData.findIndex(
                (player) => player.userId === findIndex
              );
              if (removeUserDataIndex !== -1) {
                updatedUserData.splice(removeUserDataIndex, 1);
              }
              return updatedUserData;
            });
          })
        );
        subscriptions.push(
          client.subscribe(`/topic/quiz-room/${QuizroomId}/chat`, (message) => {
            const newChat = JSON.parse(message.body);
            setChatList((prevChatList) => [...prevChatList, newChat]);
            console.log(chatList);
          })
        );
      } catch (error) {
        console.error('Failed to subscribe:', error);
      }
      return () => {
        subscriptions.forEach((sub) => sub.unsubscribe());
      };
    }
  };

  useEffect(() => {
    if(client){
      client.onConnect = () =>{
        setSocketConnect();
      }
      client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };
    }
  }, [client]);

  if(width < 760 ){
    return <Container>
      <MobileHeader/>
      {
          userData.length === 0 ? <LoadingUI>{loadingText}</LoadingUI> 
          :
          <ViewUserList_Mobile UserList={userData}/>
        }
      <ViewChatList_Mobile OpenChatList={null} chatList={chatList}/>
      <Bottomwrapper>
        <MobileButton onClick={()=>startQuizRoom(QuizroomId)}>게임 시작</MobileButton>
        <SendMessage_Mobile OpenChatList={null} placeholder={'채팅을 입력해주세요'} quizGameId={QuizroomId}></SendMessage_Mobile>
      </Bottomwrapper>
    </Container>
  }
  
  
  return (
    <Container>
      <Header/>
      <Wrapper>
          <UserControllerLayout>
          {
          userData.length === 0 ? <LoadingUI>{loadingText}</LoadingUI> 
          :
            <ViewUserList UserList={userData}></ViewUserList>
          }
            <ChatLayout>
              {width}
              <FirstBox>
                <ViewChatList OpenChatList={null} width={1074} chatList={chatList} ></ViewChatList>
                <QuizRoomInfoWrapper>
                  <ViewQuizRoomInfo OpenModal={toggleModal} maxParticipant={quizData?.maxParticipant} quizTitle={quizData?.quizTitle}></ViewQuizRoomInfo>
                </QuizRoomInfoWrapper>
              </FirstBox>
              <SecondBox>
                <SendMessage OpenChatList={null} width={1074} placeholder={'채팅을 입력해주세요'} quizGameId={QuizroomId}></SendMessage>
                <StartGameButton roomId={QuizroomId}></StartGameButton>
              </SecondBox>
            </ChatLayout>
          </UserControllerLayout>
          <EditQuizRoomInfo
            quizRoomId={QuizroomId}
            roomData={quizData}
            isOpen={modalOpen} 
            onClose={toggleModal}
          ></EditQuizRoomInfo>
      </Wrapper>
    </Container>
  );
};



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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const UserControllerLayout = styled.div`
  width: 1440px;
`

const HostControllerLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

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
const ChatLayout = styled.div`
  width: 100%;
  height: 300px;
`
const FirstBox = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
`
const SecondBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

const QuizRoomInfoWrapper = styled.div`
  margin-left: 12px;
`

const Bottomwrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StartGameByMobile = styled.div`
  width: 30%;
  height: 70px;
  background-color: purple;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`

const MobileButton = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #FD7400;
  color: white;
  font-size: 16px;
  margin-right: 16px;
`