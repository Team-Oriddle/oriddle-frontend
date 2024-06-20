import { Header } from "@/components/header/Header";
import { ChooseQuizFromCreatePage } from "@/features/ChooseQuizFromCreatePage/ui/ChooseQuizFromCreatePage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { EditQuizSetting } from "@/features/EditQuizSetting/ui/EditQuizSetting";
import { ChooseQuizEditPageNumber } from "@/features/ChooseQuizEditPageNumber/ui/ChooseQuizEditPageNumber";
import { EditQuizInfo } from "@/features/EditQuizInfo/ui/EditQuizInfo";
import { EmbedYoutube } from "@/features/EmbedYoutube/ui/EmbedYoutube";
import { EmbedMusic } from "@/features/EmbedMusic/ui/EmbedMusic";
import { AddQuizFromCreatePage } from "@/features/AddQuizFromCreatePage";
import { postQuiz } from "@/entities/quiz";
import { AddQuizSource } from "@/features/AddQuizSource";
import { AddQuizType } from "@/features/AddQuizType";


type QuizCreateProps = {
  QuizGameId: number;
};

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
  const router = useRouter();
  const [quizList, setQuizList] = useState<any>([
    {
      number: 0,
      description: "", // 문제 설명
      source: "", // 문제에 사용되는 이미지 URL
      type: "SHORT_ANSWER", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
      sourceType: "", // 문제의 소스 타입(QuestionSourceType)
      timeLimit: 10, // 문제 제한 시간
      score: 10, // 정답자에게 부여할 점수
      answers: [""],
    },
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState<any>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [settingPage, setSettingPage] = useState<number>(1);//추후에 추가 설정을 위한 페이지
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [ youtubeModalOpen , setYoutubeModalOpen ] = useState<boolean>(false);
  const [ musicModalOpen , setMusicModalOpen ] = useState<boolean>(false);
  const [ thumbnail, setThumbnail ] = useState<any>("");
  const toggleMusicModal = () => {
    setMusicModalOpen(!musicModalOpen);
  }

  const toggleYoutubeModal = () => {
    setYoutubeModalOpen(!youtubeModalOpen);
  }

  const handleNextPage = () => {
    setSettingPage((prevPage) => Math.min(prevPage + 1, 3));
  };

  const handlePreviousPage = () => {
    setSettingPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  const handleQuizSelect = (index: any) => {
    setSelectedQuiz(index);
    console.log("선택된 퀴즈는" + index);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const handleAddQuiz = () => {
    const newNumber = quizList[quizList.length - 1].number + 1;
    setQuizList([
      ...quizList,
      {
        number: newNumber,
        description: "", // 문제 설명
        source: "", // 문제에 사용되는 이미지 URL
        type: "SHORT_ANSWER", // 문제 타입(QuestionType: MUTILPLE_CHOICE, SHORT_ANSWER, TRUE_FALSE)
        sourceType: "", // 문제의 소스 타입(QuestionSourceType)
        timeLimit: 10, // 문제 제한 시간
        score: 10, // 정답자에게 부여할 점수
        answers: [""],
      },
    ]);
    setSelectedQuiz(newNumber);
  };

  const handleAddOptionAnswer = () => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        const newAnswers = [...quiz.answers, ""];
        console.log(quiz.answers);
        return { ...quiz, answers: newAnswers };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  };

  const handleEditOptionAnswer = (editNumber: any, editValue: any) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        const newAnswers = quiz.answers.map((answer: any, index: any) => {
          if (editNumber === index) {
            console.log(editValue)
            return editValue;
          }
          return answer;
        });
        return { ...quiz, answers: newAnswers };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  };

  //TODO: 옵션 정답 잘 되는지 확인

  const handleDeleteOptionAnswer = (deleteIndex: number) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        const newAnswers = quiz.answers.filter(
          (_: any, index: number) => index !== deleteIndex
        );
        return { ...quiz, answers: newAnswers };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  };

  const handleEditQuiz = (
    EditNumber: number,
    EditObject: string,
    EditValue: any
  ) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === EditNumber) {
        return { ...quiz, [EditObject]: EditValue };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  };

  const handleEditTimeLimit = (EditValue: number) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        return { ...quiz, timeLimit: EditValue };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  };
  
  const handleEditScore = (EditValue: number) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        return { ...quiz, score: EditValue };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  };

  const handleEditQuizType = (EditValue: string) => {
    const newQuizList = quizList.map((quiz: any) => {
      if (quiz.number === selectedQuiz) {
        return { ...quiz, type: EditValue };
      }
      return quiz;
    });
    setQuizList(newQuizList);
  };
  

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
  };





  const handleDeleteQuiz = (number: number) => {
    const newArray = quizList
      .filter((quiz: any) => {
        if (quiz.number === number) {
          return false;
        }
        return true;
      })
      .map((quiz: any) => {
        if (quiz.number >= number) {
          return { ...quiz, number: quiz.number - 1 };
        }
        return quiz;
      });
    setSelectedQuiz(number - 2);
    setQuizList(newArray);
  };

  const CreateGamebyGPT =(title, des) => {
    alert("gpt생성")
    // try {
    //   const response = await fetch(
    //     `http://localhost:8080/api/v1/quiz/gpt`,
    //     {
    //       method: "POST",
    //       credentials: "include",
    //       body: JSON.stringify({
    //         title:title,
    //         description:des
    //       })
    //     }
    //   );
    //   const data = await response.json();
    //   setTitle(data.title)
    //   setDescription(data.description)
    //   setQuizList(data.questions)
    //   setThumbnail(data.image)
    // } catch (error) {
      //alret("올바르지 않습니다")
    // }
    alert("생성되었습니다!")

  }

  const [isDelete, setIsDelete] = useState<boolean>(false);
  //0. 버튼을 누르면 selected를 변경하고 isDelete를 변경을해줌
  //1. isDelete -> false->true
  //2.

  const handleCreateQuiz = async () => {
    const quizListForm = quizList.map((quiz, index) => {
      return { ...quiz, number: index + 1 };
    });

    postQuiz(title, description, thumbnail , quizListForm,router);
  }
  

  
  const uploadingImage = (e: any) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
    setImg(e.target.files[0]);
  };

  const [img, setImg] = useState<any>("");

  useEffect(() => {
    const formData = new FormData();
    formData.append("file", img);
    const uploadImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/quiz/image`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data);
        handleEditQuiz(selectedQuiz, "source", data.data.url);
        handleEditQuiz(selectedQuiz, "sourceType", "IMAGE");
      } catch (error) {
        console.log(error);
      }
    };
    uploadImage();
  }, [img]);
  
  return (
    <Container>
      <Header />
      <Wrapper>
        <LeftBox>
          <SettingButton onClick={toggleModal}>
            전체 설정
          </SettingButton>
          <QuizListContainer>
            <ChooseQuizFromCreatePage
              quizList={quizList}
              onQuizSelect={handleQuizSelect}
              onQuizDelete={handleDeleteQuiz}
            />
            <AddQuizFromCreatePage addQuiz={handleAddQuiz} />
          </QuizListContainer>
        </LeftBox>
        <CenterBox> 
          <TitleInput
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TitleInput>
          {/* TODO: EditQuiz로 feature 생성 */}
          <QuizContainer>
            <AddQuizSource
              selectedQuiz={quizList[selectedQuiz]}
              toggleMusicModal={toggleMusicModal}
              toggleYoutubeModal={toggleYoutubeModal}
              uploadingImage={uploadingImage}
            />
            <QuizInput
              placeholder="질문을 입력해주세요"
              value={quizList[selectedQuiz]?.description ?? ""}
              onChange={(e) =>
                handleEditQuiz(selectedQuiz, "description", e.target.value)
              }
            ></QuizInput>
          </QuizContainer>
          <AddQuizType
            quizList={quizList}
            quizIndex={selectedQuiz}
            selectedQuiz={quizList[selectedQuiz]}
            handleEditMainAnswers={handleEditMainAnswers}
            handleEditOptionAnswer={handleEditOptionAnswer}
            handleDeleteOptionAnswer={handleDeleteOptionAnswer} 
            handleAddOptionAnswer={handleAddOptionAnswer}
          ></AddQuizType>
          {/* TODO: feature로 빼내기 */}
        </CenterBox>
        <RightBox>
            <ChooseQuizEditPageNumber
              selectedPage={settingPage}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            ></ChooseQuizEditPageNumber>
            <EditQuizSetting 
              EditTitle="문제유형" 
              EditOption={['MULTIPLE_CHOICE','SHORT_ANSWER','TRUE_FALSE']}
              Value={quizList[selectedQuiz]?.type}
              HandleEdit={handleEditQuizType}
            ></EditQuizSetting>
            <EditQuizSetting 
              EditTitle="시간 제한" 
              EditOption={[10,20,30,40,50]}
              Value={quizList[selectedQuiz]?.timeLimit}
              HandleEdit={handleEditTimeLimit}
            ></EditQuizSetting>
            <EditQuizSetting 
              EditTitle="점수" 
              EditOption={[10,20,30,40,50]}
              Value={quizList[selectedQuiz]?.score}
              HandleEdit={handleEditScore}
            ></EditQuizSetting>
            <CreateQuizButton onClick={handleCreateQuiz}>
              퀴즈 생성하기
            </CreateQuizButton>
          </RightBox>
          <EditQuizInfo 
            title={title}
            editTitle={setTitle}
            description={description} 
            editDescription={setDescription}
            isOpen={modalOpen} 
            onClose={toggleModal}
            handlethumbnail={setThumbnail}
            thumbnail={thumbnail}
            gpt={CreateGamebyGPT}
            >
          </EditQuizInfo>
          <EmbedYoutube
            isOpen={youtubeModalOpen}
            onClose={toggleYoutubeModal}
            setSource={handleEditQuiz}
            selectedQuiz={selectedQuiz}
          >
          </EmbedYoutube>
          <EmbedMusic
            isOpen={musicModalOpen}
            onClose={toggleMusicModal}
            setSource={handleEditQuiz}
            selectedQuiz={selectedQuiz}
          >
          </EmbedMusic>
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
  color: black;
`;

const Wrapper = styled.div`
  width: 100%;
  /* max-width: 1440px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 1;

`;

const LeftBox = styled.div`
  width: 244px;
  margin: 0px 0px;
  display: flex;
  flex-direction: column;
  align-items:center;
  height: 640px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const CenterBox = styled.div`
  width: 830px;
  margin: 0px 12px;
  display: flex;
  flex-direction: column;
`;

const RightBox = styled.div`
  width: 342px;
  margin: 0px 12px;
  display: flex;
  flex-direction: column;
`;

const SettingButton = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 50px;
  background-color: #FD7400;
  margin: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const StyleInput = styled.input`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
`;

const TitleInput = styled(StyleInput)`
  width: 100%;
  height: 60px;
  font-weight: bold;
  margin: 10px 0px;
  font-size: 28px;
`;

const QuizInput = styled(StyleInput)`
  width: 464px;
  height: 100%;
  font-size: 28px;
`;

const QuizContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;




const ImageInput = styled(StyleInput)`
  width: 100px;
  height: 100px;
`;

const CreateQuizButton = styled.div`
  width: 100%;
  font-weight: bold;
  text-align: center;
  border-radius: 12px;
  font-size: 24px;
  color: white;
  padding: 12px 0px;
  background-color: #FD7400;
  cursor: pointer;
`;

const QuizListContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`

