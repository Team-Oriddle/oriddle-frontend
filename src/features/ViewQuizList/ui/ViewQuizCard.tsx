import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

type QuizCardProps = {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
};

export const ViewQuizCard = ({ id, title, content, imageUrl }: QuizCardProps) => {
  const router = useRouter();

  return (
    <Layout onClick={() => router.push(`/quiz/info/${id}`)}>
      <QuizImageWrapper>
        <Image
          src={imageUrl}
          alt='quiz image'
          layout='fill'
          objectFit='cover'
        />
      </QuizImageWrapper>
      <Title>{title}</Title>
      <Context>{content}</Context>
    </Layout>
  );
  //TODO: 최대 글자수 제한
};

const Layout = styled.div`
  height: 500px;
  padding: 16px;
  width: 342px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  transition: filter 0.3s;
  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  }
`;

const QuizImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #4f3e2e;
  /* stroke 1px 배경색상으로 지정하기 */
  border: 5px solid #4f3e2e;
`;

const Title = styled.div`
  width: 300px;
  height: 48px;
  font-size: 20px;
  font-weight: 700;
  color: black;
  margin: 5px;
`;

const Context = styled(Title)`
  font-size: 15px;
  font-weight: 400;
`;