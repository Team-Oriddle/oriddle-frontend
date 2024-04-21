import { useRouter } from "next/navigation";
import { styled } from "styled-components";

const ButtonBlock = () => {
  const router = useRouter();

  const routeToMainPage = () => {
    router.push("/");
  };

  return (
    <Container>
      <Button onClick={routeToMainPage}>메인 페이지로 이동</Button>
      {/* TODO: 퀴즈 방으로 돌아가기 구현 */}
      <Button>다시하기</Button>
    </Container>
  );
};

export default ButtonBlock;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  margin-top: 20px;
  gap: 20px;
`;

const Button = styled.button`
  width: 266px;
  height: 80px;
  background-color: #643dd2;
  border-radius: 1000px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
  cursor: pointer;
`;
