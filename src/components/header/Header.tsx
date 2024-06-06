import { userAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";
import cookie from 'react-cookies';


export const Header = () => {
  const [authState] = useAtom(userAtom);
  useEffect(() => {
    console.log(`authState: `, authState);
  }, [authState]);

  const router = useRouter();
  const routeToMain = () => {
    router.push("/");
  };

  const routeToMyPage = () => {
    alert("My Page로 이동합니다.");
  };

  const routeToLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    alert("(개발 중)로그아웃 액션입니다.");
  };

  const CreateQuiz = () => {
    router.push("/quiz/create/1");
  };

  return (
    <Layout>
      <Title onClick={routeToMain}>ORIDDLE</Title>
      {/* TODO: 검색 바 넣기 */}
      <Buttons>
        {/* TODO: 로그인 이전, 이후의 헤더 항목 업데이트 필요 */}
        {authState.isLoggedIn ? (
          <>
            <Button onClick={CreateQuiz}>MAKE QUIZ</Button>

            <Button onClick={routeToMyPage}>MY PAGE</Button>
            <Button onClick={handleLogout}>LOGOUT</Button>
          </>
        ) : (
          <>
            <Button onClick={routeToMyPage}>MY PAGE</Button>
            <Button onClick={routeToLogin}>LOGIN</Button>
          </>
        )}
      </Buttons>
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 30px;
  margin-bottom: 30px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black;
  width: 1440px;
`;

const Title = styled.h1`
  all: unset;
  font-size: 40px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Buttons = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`;

const Button = styled.button`
  all: unset;
  color: black;
  width: 98px;
  height: 70px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
