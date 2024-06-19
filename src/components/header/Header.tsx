import { getLogout, getUserData } from "@/entities/user";
import { userAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";


export const Header = () => {
  const [authState, setAuthState] = useAtom(userAtom);
  useEffect(() => {
    console.log(`authState: `, authState);
  }, [authState]);

  const router = useRouter();
  const routeToMain = () => {
    router.push("/");
  };

  const routeToMyPage = () => {
    alert('개발중입니다')
    // getUserData().then((data) => {
    //   console.log(data);
    // });
  };

  const routeToLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    // getLogout().then((data) => {
    //   alert("로그아웃 되었습니다.");
    // });
    setAuthState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      user: undefined,
    }));
    window.location.reload();
  };

  const CreateQuiz = () => {
    router.push("/quiz/create/1");
  };

  const QuizRoomList = () => {
    router.push("/quiz/roomlist");
  };

  return (
    <Layout>
      <Title onClick={routeToMain}>ORIDDLE</Title>
      {/* TODO: 검색 바 넣기 */}
      <Buttons>
        {authState.isLoggedIn ? (
          <>
            <Button onClick={QuizRoomList}>ROOM</Button>
            <Button onClick={CreateQuiz}>CREATE</Button>
            <Button onClick={routeToMyPage}>MY PAGE</Button>
            <Button onClick={handleLogout}>LOGOUT</Button>
          </>
        ) : (
          <>
            <Button onClick={routeToLogin}>LOGIN</Button>
          </>
        )}
      </Buttons>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  max-width:  1440px;
  padding-top: 30px;
  margin-bottom: 30px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black;

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
