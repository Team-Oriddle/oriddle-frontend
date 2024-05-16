import { UserChat } from "@/components/game/UserChat";
import { Question } from "@/components/game/Question";
import { QuizSource } from "@/components/game/QuizSource";
import { Header } from "@/components/header/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initializeSocket } from "@/entities/socket/socket";
import Modal from "@/components/game/Modal";
import { SendMessage } from "@/features/SendMessage/ui/sendMessage";
import { getQuizRoomData } from "@/entities/quizroom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh; // Viewport Height
  width: 100vw; // Viewport Width
  min-width: 100vw;
  background-color: white;
  color: black;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`

const ParentForLoadingUI = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column: 1/13;
`

const LoadingUI = styled.div`
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 430px;
  font-size: 72px;
  font-weight: bolder;
  color:  #643DD2;;
`

type QuizGameProps = {
  QuizGameId :number
}

interface QuestionDataType{
  description:string
  number:number
  score:number
  source:string
  sourceType:string
  timeLimit: number
  type: string
}

interface UserData{
  nickname:string,
  position: number,
  userId:number,
  isHost:boolean,
  score:number
}

interface ChatType{
  user:string,
  chat:string
}

interface AnswerType{
  userId?:number,
  answer:string,
  score?:number,
}


export const QuizGamePage = ({QuizGameId}:QuizGameProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState<QuestionDataType>({
    description: "",
    number: -1,
    score: -1,
    source: "",
    sourceType: "",
    timeLimit: -1,
    type: "",
  });
  //TODO: 추후에 채팅기능 추가시 활용
  const [chatLog, setChatLog] = useState<ChatType[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [answerData, setAnswerData] = useState<AnswerType>({
    userId:-1,
    answer:'',
    score:-1,
  });
  const [ answerUser, setAnswerUser ] = useState<string>('')
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [finishModalOpen, setFinishModalOpen] = useState(false);

  const toggleAnswerModal = () => setAnswerModalOpen(!answerModalOpen);
  const toggleFinishModal = () => setFinishModalOpen(!finishModalOpen);
  const [ loadingText, setLoadingText ] = useState("Loading")
  const [ timer, setTimer] = useState(5)

  useEffect(()=>{
    //TODO: API 호출부 변경
    getQuizRoomData(QuizGameId).then((result)=>{
      result.participants.forEach(participant =>{
        participant.score = 0;
      })
      setUserData(result.participants)
    })
    //새로운 소켓 연결 해야함
  },[QuizGameId])

  useEffect(()=>{
    const interval = setInterval(()=>{
      setLoadingText((prev)=>{
        if(prev.length < 10) return prev+"."
        return "Loading"
      })
    },500)
    return ()=>  clearInterval(interval)
  },[])

  useEffect(()=>{
    const timeInterval = setInterval(()=>{
      setTimer((prev) => (prev > 0 ? prev-1 : 0))
    },1000)
    return ()=>  clearInterval(timeInterval)
  },[])

  useEffect(()=>{
    const getSocket = (quizRoomId:number) => {
      console.log('소켓 연결 시도중')
      const subscriptions = [
        { topic: `/topic/quiz-room/${quizRoomId}/join`, callback:(message) =>{
          console.log(message)
          let newUser = {...message, isHost:false}
          setUserData([...userData,newUser])
          userData.sort(function(a,b){
            return a.position-b.position
          })
        }},
        //strictMode가 켜져 있는 경우 제대로 작동하지 않음
        { topic: `/topic/quiz-room/${quizRoomId}/leave`, callback:(message) =>{
          console.log(message)
          const findIndex = message.userId;
          const copyUserData = userData
          const removeUserData = copyUserData.findIndex(player => player.userId === findIndex)
          if (removeUserData !== -1) {
            copyUserData.splice(removeUserData, 1);
          }
          setUserData(copyUserData);
        }},
        //strictMode가 켜져 있는 경우 제대로 작동하지 않음
        { topic: `/topic/quiz-room/${quizRoomId}/question`, callback:(message) =>{
          setIsLoading(false)
          console.log(message)
          setQuestionData(message)
        }},
        { topic: `/topic/quiz-room/${quizRoomId}/answer`, callback:(message) =>{
          console.log(userData)
          console.log(message)//메시지를 받음
          setAnswerData(message)//AnswerData로 관리 
          let copyUserData = userData//userData을 카피 여기서 굳이 순서를 나눌 필요는 없어보임
          let foundIndex = -1;//초기값 설정
          userData.forEach((participant, index)=>{//userData를 반복
            if(participant.userId.value === message.userId){//userData.userID와 message.userID가 같은 값을 찾는다
              foundIndex = index//찾은 경우
              //여기서 지금 처리를 score업데이트 해주자
              console.log('FoundIndex'+foundIndex)
            }//탈출했는데 없으면
          })
          if(foundIndex !== -1){
            copyUserData[foundIndex].score += message.score;
            setAnswerUser(copyUserData[foundIndex].nickname)//흠...?
          }else{
            console.log('사용자가 존재하지 않습니다!')
          }
          setUserData(copyUserData)
          toggleAnswerModal()
        }},
        { topic: `/topic/quiz-room/${quizRoomId}/finish`, callback:(message) =>{
          console.log(message)
          router.push(`/quiz-result/${message.quizResultId}`)
          //TODO: 결과 페이지로 이동
        }},
        { topic: `/topic/quiz-room/${quizRoomId}/time-out`, callback:(message) =>{
          console.log(message)
          setAnswerData(message)
          toggleFinishModal()
        }},
        { topic: `/topic/quiz-room/${quizRoomId}/chat`, callback:(message) =>{
          console.log(message)
          //TODO: 백엔드 채팅이 끝나면 채팅 관련 코드 추가
        }},
      ]
      initializeSocket('ws://localhost:8080/ws', subscriptions)//소켓 연결
    }
    console.log('useEffect작동')
    getSocket(QuizGameId)

  },[])
  ///처리해야할 데이터
  //1. 타이머
  //4. 유저 채팅 데이터

  //chat의 경우 메세지가 오면 보여준다
  return (
    <Container>
      <Wrapper>
        <Header></Header>
        {
          isLoading ? <LoadingUI>{loadingText}
          <div>{timer}</div>
          </LoadingUI> 
          : 
        <ParentForLoadingUI>
          <Question description={questionData.description} number={questionData.number} type={questionData.type} score={questionData.score} ></Question>
          <QuizSource url={questionData.source} sourceType={questionData.sourceType}></QuizSource>
        </ParentForLoadingUI>
        }
          <UserChat UserList={userData} ></UserChat>
          <SendMessage quizGameId={QuizGameId}></SendMessage>
        <Modal isOpen={answerModalOpen} onClose={toggleAnswerModal}>
          <div>정답:{answerData.answer}</div>
          <div>{answerUser} 님이 정답을 맞추셨습니다</div>
          <div> (+{answerData.score}점)</div>
        </Modal>
        <Modal isOpen={finishModalOpen} onClose={toggleFinishModal}>
          <div>정답은 {answerData.answer}입니다</div>
        </Modal>
    </Wrapper>

    </Container>
  );
};