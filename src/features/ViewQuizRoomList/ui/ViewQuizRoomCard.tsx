import { joinQuizRoom } from "@/entities/quizroom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export const ViewQuizRoomCard = ({ id, imageUrl , title, quizTitle, maxParticipant, currentParticipant,status}: QuizCardProps) => {
  const router = useRouter();
  return (
    <Layout>
      <BlackEffect isWait={status === "WAIT"}></BlackEffect>
      <QuizImageWrapper>
        <Image
          src={imageUrl}
          alt='quiz image'
          layout='fill'
          objectFit='cover'
        />
      </QuizImageWrapper>
      <Title>{title}</Title>
      <Context>퀴즈:{quizTitle}</Context>
      <Context>참가자:{currentParticipant}/{maxParticipant}</Context>
      <ButtonLayout>
        <JoinButton onClick={()=>joinQuizRoom(id,router)} >{status === "WAIT" ? '참여하기' : '진행중'}</JoinButton>
      </ButtonLayout>
    </Layout>
  );
  //TODO: 최대 글자수 제한
};



const Layout = styled.div<{ isWait: boolean }>`
  height: 450px;
  padding: 16px;
  width: 342px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  transition: filter 0.3s;
  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  }
`;

const QuizImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 250px;
  background-color: #4f3e2e;
  /* stroke 1px 배경색상으로 지정하기 */
  border: 5px solid #4f3e2e;
`;

const Title = styled.div`
  width: 300px;
  font-size: 20px;
  font-weight: 700;
  color: black;
  margin: 5px;
`;

const Context = styled(Title)`
  font-size: 16px;
  font-weight: 400;
`;

const JoinButton = styled.div`
  width: 50%;
  height: 50px;
  cursor: pointer;
  background-color: #FD7400;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  &:hover {
    background-color: #bf7600;
  }
`

const ButtonLayout = styled.div`
  margin-top: 16px;
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: end;
`


const BlackEffect = styled.div<{ isWait: boolean }>`
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  position: absolute;
  background-color: black;
  opacity: 0.5;
  z-index: 2;
  display: ${props => props.isWait ? 'none' : ''};
`