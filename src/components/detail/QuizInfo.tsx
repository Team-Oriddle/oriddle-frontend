import styled from "styled-components"
import DefalutButton from "../common/DefalutButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { CreateQuizRoom } from "@/features/CreateQuizRoom/ui/CreateQuizRoom"
import Image from "next/image"

// TODO: 모달 열렸을시 스크롤 이벤트 막기

const Layout = styled.div`
  margin-top: 250px;
  display: grid;
  column-gap: 24px;
  grid-column: 1/13;
  grid-template-columns: repeat(12, 1fr);
`

const QuizImg = styled.div`
  grid-column: 1/6;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`

const QuizDetailLayout = styled.div`
  grid-column: 6/13;
  height: 400px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
`

const QuizDetail = styled.div`
  margin: 30px 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuizTitle = styled.div`
  width: 100%;
  font-size: 25px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
`

const QuizDescription = styled.div`
  font-size: 20px;
  width: 700px;
  height: 200px;
  margin-top: 20px;
  overflow: scroll;
  margin-bottom: 20px;
`

const ButtonLayout = styled.div`
  width: 320px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    z-index: 1;
`;

const ModalLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 2;
`

const InfoModal = styled.div`
  width: 586px;
  height: 400px;
  border-radius: 20px;
  background-color: white;
  margin: 5px;
  background-image: url(${(props) => props.imgSource});
  background-size: cover;
`

const BlackLayout = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  opacity: 70%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  color: white;
  padding: 39px 43px;
`
const TitleText = styled.div`
  font-weight: 600;
  font-size: 25px;
`
const ContentText = styled.div`
  opacity: 100%;
  font-size: 20px;
  font-weight: 400;
  overflow: scroll;
  margin: 21px 0px;
`
const HashTagText = styled.div`
  font-size: 20px;
  font-weight: 600;
`


type Props = {
  quizId :number
}

export const QuizInfo = ({quizId}:Props) =>{

  const [title, setTitle] = useState('title');
  const [description, setDescription] = useState('context');
  const [img, setImg] = useState('');

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  //추후에 구조 분해 할당 활용한 코드로 수정

  useEffect(()=>{
    const fetchQuizDetail =async (id:number) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/quiz/info/${id}`)
        console.log(response)
        setTitle(response.data.data.title)
        setDescription(response.data.data.description)
        setImg(response.data.data.imageUrl)
        
      } catch (error) {
        console.error('Error fetching quiz info:', error);
      }
    }

    fetchQuizDetail(quizId)
  })


  return (
    <Layout>  
      <QuizImg>
        <Image
          src={img}
          alt="썸네일"
          layout="fill"
          objectFit="cover"
        />
      </QuizImg>
      <QuizDetailLayout>
        <QuizDetail>
          <QuizTitle>{title}</QuizTitle>
          <QuizDescription>{description}</QuizDescription>
            <DefalutButton color="보라" txt="방만들기" onClick={()=>setModalOpen(true)} ></DefalutButton>            
        </QuizDetail>
      </QuizDetailLayout>
      {modalOpen ?
          <ModalBackdrop onClick={()=>setModalOpen(false)}>
            <ModalLayout onClick={(e) => e.stopPropagation()}>
              <InfoModal imgSource={img}>
                  <BlackLayout>
                    <TitleText>{title}</TitleText>
                    <ContentText>{description}</ContentText>
                    <HashTagText>#해쉬태그</HashTagText>
                  </BlackLayout>
              </InfoModal>
              <CreateQuizRoom quizId={quizId} handleModal={()=>setModalOpen(false)}></CreateQuizRoom>
            </ModalLayout>
          </ModalBackdrop>
          // 모달이 열려있다면
        :
          null
          //모달이 당혀있다면
        }
    </Layout>
  )
}