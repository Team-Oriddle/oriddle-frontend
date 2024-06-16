import { userAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";


export const MobileHeader = () => {
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

  const handleBack = () => { 
    router.back();
  }

  return (
    <Layout>
      <Title onClick={handleBack}>&lt; </Title>
      <Title onClick={routeToMain}>ORIDDLE</Title>
      <Title>i</Title>

      {/* <Title onClick={routeToMain}>ORIDDLE</Title>
      {/* TODO: 검색 바 넣기 */}
      {/* <Buttons>
        {authState.isLoggedIn ? (
          <>
            <Button onClick={CreateQuiz}>CREATE</Button>
            <Button onClick={routeToMyPage}>MY PAGE</Button>
            <Button onClick={handleLogout}>LOGOUT</Button>
          </>
        ) : (
          <>
            <Button onClick={routeToLogin}>LOGIN</Button>
          </>
        )}
      </Buttons> */}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  padding-top: 30px;
  margin-bottom: 30px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: black;

`;

const Title = styled.h1`
  all: unset;
  font-size: 20px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
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
  margin: 0px 12px
`;
