import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Layout = styled.div`
  height: 500px;
  padding: 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  /* hover 시 약간 그림자 지도록 하기 */
  transition: filter 0.3s;
  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  }
`;
// 추후에 img로 변경
// -> wrapper로 지정하고 내부에서 Next.js Image 컴포넌트를 사용하도록 변경
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

type QuizCardProps = {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
};

export const QuizCard = ({ id, title, content, imageUrl }: QuizCardProps) => {
  const router = useRouter();

  return (
    <Layout onClick={() => router.push(`/detail/${id}`)}>
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
};
