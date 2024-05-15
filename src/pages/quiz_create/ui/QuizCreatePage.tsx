import { Header } from "@/components/header/Header"
import { AddQuizFromCreatePage } from "@/features/AddQuizFromCreatePage/ui/AddQuizFromCreatePage"
import { ChooseQuizFromCreatePage } from "@/features/ChooseQuizFromCreatePage/ui/ChooseQuizFromCreatePage"
import Image from "next/image"
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

const StyleInput = styled.input`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
`

const TitleInput = styled(StyleInput)`
  width: 100%;
  height: 60px;
  font-weight: bold;
  margin: 10px 0px;
  font-size: 28px;
`

const QuizInput = styled(StyleInput)`
  width: 464px;
  height: 100%;
  font-size: 28px;
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

const AnswerInput = styled(StyleInput)`
  width: 100%;
  height: 150px;
  margin: 10px 0px;
  font-size: 28px;

`

const OtherAnswerInput = styled.div`
  width: 100%;
  height: 150px;
  margin: 10px 0px;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
  overflow-y: scroll;
`

const AnswerOptionButton = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 30px;
  text-align: center;
  &:hover {
    background-color: #643DD2;
    color: white;
  }
`

const OptionAnswerInput = styled.input`
  background-color: white;
  font-size: 32px;
  width: calc(100% - 40px); // Adjust to leave space for the delete button
  height: 60px;
  margin-right: 10px;
  color: black;
  background-color: white;
  border: none;
  text-align: center;
`

const DeleteButton = styled.button`
  color: #643DD2;
  font-weight: bold;
  background-color: white;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const AnswerWrapper = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  width: 100%;

`

const ImageInput = styled(StyleInput)`
  
`

type QuizCreateProps = {
  QuizGameId: number;
}

interface IQuiz {
  number: number;
  description: string;
  source: string;
  type: string;
  timeLimit: number;
  score: number;
  mainAnswer: string;
  addtionalAnswers: string[];
}

export const QuizCreatePage = ({ QuizGameId }: QuizCreateProps) => {
  const [quizList, setQuizList] = useState<any>([
    {
      number: 0,
      description: "", // 문제 설명
      source: "", // 문제에 사용되는 이미지 URL
      type: "SHORT_ANSWER", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
      sourceType: "IMAGE", // 문제의 소스 타입(QuestionSourceType)
      timeLimit: 30, // 문제 제한 시간
      score: 30, // 정답자에게 부여할 점수
      answers: [
        ''
      ]
    }
  ])

  const [selectedQuiz, setSelectedQuiz] = useState<any>(0)

  const handleQuizSelect = (index: any) => {
    setSelectedQuiz(index);
    console.log('선택된 퀴즈는' + index)
  }

  const handleAddQuiz = () => {
    const newNumber = quizList[quizList.length - 1].number + 1
    setQuizList([...quizList, {
      number: newNumber,
      description: "", // 문제 설명
      source: "", // 문제에 사용되는 이미지 URL
      type: "", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
      sourceType: "", // 문제의 소스 타입(QuestionSourceType)
      timeLimit: null, // 문제 제한 시간
      score: null, // 정답자에게 부여할 점수,
      answers: [
        ''
      ]
    }])
    setSelectedQuiz(newNumber)
  }

  const handleAddOptionAnswer = () => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        const newAnswers = [...quiz.answers, '']
        console.log(quiz.answers)
        return { ...quiz, answers: newAnswers }
      }
      return quiz
    })
    setQuizList(newQuizList)
  }

  const handleEditOptionAnswer = (editNumber: any, editValue: any) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        const newAnswers = quiz.answers.map((answer: any, index:any) => {
          if (editNumber === index) {
            return { ...answer, editValue }
          }
          return answer
        });
        return { ...quiz, answers: newAnswers }
      }
      return quiz
    })
    setQuizList(newQuizList)
  }

  const handleDeleteOptionAnswer = (deleteIndex: number) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        const newAnswers = quiz.answers.filter((_: any, index: number) => index !== deleteIndex);
        return { ...quiz, answers: newAnswers };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  }

  const handleEditQuiz = (EditNumber: number, EditObject: string, EditValue: any) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === EditNumber) {
        return { ...quiz, [EditObject]: EditValue }
      }
      return quiz
    });
    setQuizList(newQuizList)
  }

  const handleEditMainAnswers = (EditNumber: number, EditValue: any) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === EditNumber) {
        const newAnswers = quiz.answers.map((answer: any, index: number) => {
          if (index === 0) {
            return EditValue;
          }
          return answer;
        });
        return { ...quiz, answers: newAnswers };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  }
  
  const handleDeleteQuiz = (number: number) => {
    const newArray = quizList.filter((quiz: any) => {
      if (quiz.number === number) {
        return false
      }
      return true
    }).map((quiz: any) => {
      if (quiz.number >= number) {
        return { ...quiz, number: quiz.number - 1 }
      }
      return quiz
    })
    setSelectedQuiz(number - 2)
    setQuizList(newArray)
  }

  const [isDelete, setIsDelete] = useState<boolean>(false)
  //0. 버튼을 누르면 selected를 변경하고 isDelete를 변경을해줌
  //1. isDelete -> false->true
  //2.  

  const handleCreateQuiz =async (QuizGameId:any) => {
    const quizListForm = quizList.map((quiz:any,index:any) => {
      return{...quiz, number: index+1 }
    })

    const quizForm = {
      "title":'제목',
      "description":'설명',
      "image":'https://img.seoul.co.kr/img/upload/2017/07/14/SSI_20170714170426_O2.jpg',
      "questions":quizListForm
    }
    try{
      console.log(quizForm)
      const response = await fetch(`http://localhost:8080/api/v1/quiz`,{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(quizForm)

      })
      console.log(response)
    } catch(error){
      console.log(error)
    }
  };

  const uploadingImage = (e: any) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
    setImg(e.target.files[0]);
  };

  const [img, setImg] = useState<any>('');

  useEffect(()=>{
    const formData = new FormData();
    formData.append('file', img);
    const uploadImage =async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/quiz/image`,{
          method:'POST',
          credentials:'include',
          body:formData
        })
        const data = await response.json();
        console.log(data);
        handleEditQuiz(selectedQuiz,'source',data.data.url)
      } catch (error) {
        console.log(error)
      }
    }
    uploadImage()
  },[img])



  return (
    <Container>
      <Header />
      <Wrapper>
        <LeftBox>
          <SettingButton>
          </SettingButton>
          <ChooseQuizFromCreatePage
            quizList={quizList}
            onQuizSelect={handleQuizSelect}
            onQuizDelete={handleDeleteQuiz}
          />
          <AddQuizFromCreatePage addQuiz={handleAddQuiz} />
        </LeftBox>
        <CenterBox>
          <TitleInput value={"제목"}></TitleInput>
          {/* TODO: EditQuiz로 feature 생성 */}
          <QuizContainer>
            <SourceInput>
            {
              quizList[selectedQuiz]?.source === '' ? 
            <ImageInput
              type="file"
              onChange={uploadingImage}
            />
            :
            <Image
              src={quizList[selectedQuiz]?.source}
              alt="Example Image"
              width={342}
              height={250}
          />}

            </SourceInput>
            <QuizInput
              placeholder="질문을 입력해주세요"
              value={quizList[selectedQuiz]?.description ?? ""}
              onChange={(e) => handleEditQuiz(selectedQuiz, 'description', e.target.value)}
            ></QuizInput>
          </QuizContainer>
          <AnswerInput
            placeholder="정답을 입력해주세요"
            value={quizList[selectedQuiz]?.answers[0] ?? ""}
            onChange={(e) => handleEditMainAnswers(selectedQuiz, e.target.value)}
          ></AnswerInput>
          <OtherAnswerInput>
            {quizList[selectedQuiz]?.answers.slice(1).map((answer: any, index: number) => (
              <AnswerWrapper key={index + 1}>
                <OptionAnswerInput
                  value={answer.content}
                  onChange={(e) => handleEditOptionAnswer(index + 1, e.target.value)}
                />
                <DeleteButton onClick={() => handleDeleteOptionAnswer(index + 1)}>X</DeleteButton>
              </AnswerWrapper>
            )) ??
            null}
            <AnswerOptionButton onClick={handleAddOptionAnswer}>+</AnswerOptionButton>
          </OtherAnswerInput>
          {/* TODO: feature로 빼내기 */}
        </CenterBox>
        <RightBox>
          <div onClick={handleCreateQuiz}>
            정답 전송 버튼
          </div>
        </RightBox>
      </Wrapper>
    </Container>
  )
}


