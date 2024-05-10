import { Header } from "@/components/header/Header"
import { AddQuizFromCreatePage } from "@/features/AddQuizFromCreatePage/ui/AddQuizFromCreatePage"
import { ChooseQuizFromCreatePage } from "@/features/ChooseQuizFromCreatePage/ui/ChooseQuizFromCreatePage"
import { useEffect, useState } from "react"
import styled from "styled-components"

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
  display: flex;
  flex-direction: row;
`

const LeftBox = styled.div`
  width: 220px;
  margin: 0px 6px;
  display: flex;
  flex-direction: column;
`
const CenterBox = styled.div`
  width: 830px;
  margin: 0px 6px;
  display: flex;
  flex-direction: column;
`
const RightBox = styled.div`
  width: 342px;
  margin: 0px 6px;
  display: flex;
  flex-direction: column;
`
const SettingButton = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 50px;
  background-color: #643DD2;
  margin-bottom: 12px;
`


const TitleInput = styled.div`
  width: 100%;
  height: 60px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  margin: 10px 0px;
`

const QuizContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`
const SourceInput = styled.div`
  width: 342px;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  background-color: white;
  margin-right: 20px;
`
const QuizInput = styled.div`
  width: 464px;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  background-color: white;
`
const AnswerInput = styled.div`
  width: 100%;
  height: 150px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  background-color: white;
  margin: 10px 0px;
`

const OtherAnswerInput = styled(AnswerInput)`
`


type QuizCreateProps = {
  QuizGameId :number
}

interface IQuiz{
  number:number,
  description:string,
  source:string,
  type:string,
  timeLimit:number,
  score:number,
  mainAnswer:string,
  addtionalAnswers:string[]
}

export const QuizCreatePage = ({QuizGameId}:QuizCreateProps) =>{

  const [ quizList, setQuizList ] = useState<any>([
    {
      "description": "", // 문제 설명
      "source": "", // 문제에 사용되는 이미지 URL
      "type": "", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
      "sourceType": "", // 문제의 소스 타입(QuestionSourceType)
      "timeLimit": null, // 문제 제한 시간
      "score": null, // 정답자에게 부여할 점수
      "mainAnswer": "", // 문제 메인 정답
      "additionalAnswers": []
    },
    {
      "description": "", // 문제 설명
      "source": "", // 문제에 사용되는 이미지 URL
      "type": "", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
      "sourceType": "", // 문제의 소스 타입(QuestionSourceType)
      "timeLimit": null, // 문제 제한 시간
      "score": null, // 정답자에게 부여할 점수
      "mainAnswer": "", // 문제 메인 정답
      "additionalAnswers": []
    }
  ])
  const [selectedQuiz, setSelectedQuiz ] = useState<any>(0)
  
  const handleQuizSelect = (index:any) =>{
    setSelectedQuiz(index);
    console.log(index)
  }

  const handleAddQuiz = () =>{
    setQuizList([...quizList,{
      "description": "", // 문제 설명
      "source": "", // 문제에 사용되는 이미지 URL
      "type": "", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
      "sourceType": "", // 문제의 소스 타입(QuestionSourceType)
      "timeLimit": null, // 문제 제한 시간
      "score": null, // 정답자에게 부여할 점수
      "mainAnswer": "", // 문제 메인 정답
      "additionalAnswers": []
    }])
  }

  return(
    <Container>
      <Header/>
      <Wrapper>
        <LeftBox>
          <SettingButton>

          </SettingButton>
          <ChooseQuizFromCreatePage quizList={quizList} onQuizSelect={handleQuizSelect} />
          <AddQuizFromCreatePage addQuiz={handleAddQuiz}/>
        </LeftBox>
        <CenterBox>
          <TitleInput> {quizList[selectedQuiz].descrition}</TitleInput>
          <QuizContainer>
            <SourceInput></SourceInput>
            <QuizInput></QuizInput>
          </QuizContainer>
          <AnswerInput></AnswerInput>
          <OtherAnswerInput></OtherAnswerInput>
        </CenterBox>
        <RightBox>
        </RightBox>
      </Wrapper>
    </Container>
  )
}


// {
// 	"title": "나라 이름 맞추기", // 퀴즈의 제목
// 	"description": "주어진 국기의 나라이름을 맞추는 퀴즈", // 퀴즈에 대한 설명
// 	"questions": [
// 								 {
// 										"number": 1, // 문제 번호
// 										"description": "이 나라의 이름은?", // 문제 설명
// 										"source": "http//asdacxca", // 문제에 사용되는 이미지 URL
// 										"type": "SHORT_ANSWER", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
// 										"sourceType": "IMAGE", // 문제의 소스 타입(QuestionSourceType)
// 										"timeLimit": 10, // 문제 제한 시간
// 										"score": 20, // 정답자에게 부여할 점수
// 										"mainAnswer": "메인 정답", // 문제 메인 정답
// 										"additionalAnswers": [
// 																						{
// 																							"content": "추가 정답1"
// 																						},
// 																						{
// 																							"content": "추가 정답2"
// 																						}
// 																					]  
// 									},
// 									{
// 										"number": 2, // 문제 번호
// 										"description": "이 나라의 이름은?", // 문제 설명
// 										"source": "http//asdacxca", // 문제에 사용되는 이미지 URL
// 										"type": "SHORT_ANSWER", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
// 										"sourceType": "IMAGE", // 문제의 소스 타입(QuestionSourceType: NONE, SOUND, IMAGE, VIDEO)
// 										"timeLimit": 10, // 문제 제한 시간
// 										"score": 20, // 정답자에게 부여할 점수
// 										"mainAnswer": "메인 정답", // 문제 메인 정답
// 										"additionalAnswers": [
// 																						{
// 																							"content": "추가 정답1"
// 																						},
// 																						{
// 																							"content": "추가 정답2"
// 																						}
// 																					]  
// 									}
// 								]
// }