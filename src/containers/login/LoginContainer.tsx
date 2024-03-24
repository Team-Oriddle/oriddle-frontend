import { LoginForm } from "@/components/login/LoginForm";
import { SignupForm } from "@/components/login/SignupForm";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh; // Viewport Height
  width: 100vw; // Viewport Width
  min-width: 100vw;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #1f2937; // Tailwind gray-900
  font-size: 1.875rem; // Tailwind text-3xl
  font-weight: 800; // Tailwind font-extrabold
`;

const ButtonGroup = styled.div`
  margin: 1.5rem 0;
`;

interface ButtonProps {
  isActive: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.isActive
      ? "0.375rem 0 0 0.375rem"
      : "0 0.375rem 0.375rem 0"}; // Tailwind rounded-l-lg & rounded-r-lg
  background-color: ${(props) =>
    props.isActive ? "#3b82f6" : "#ffffff"}; // Tailwind bg-blue-500 & bg-white
  color: ${(props) =>
    props.isActive
      ? "#ffffff"
      : "#1f2937"}; // Tailwind text-white & text-gray-900
  &:focus {
    outline: none;
  }
`;

const LoginContainer: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<"login" | "signup">("login");

  return (
    <Container>
      <Wrapper>
        <Title>get started!</Title>
        <ButtonGroup>
          <Button
            onClick={() => setCurrentForm("login")}
            isActive={currentForm === "login"}>
            로그인
          </Button>
          <Button
            onClick={() => setCurrentForm("signup")}
            isActive={currentForm === "signup"}>
            회원가입
          </Button>
        </ButtonGroup>
        {currentForm === "login" ? <LoginForm /> : <SignupForm />}
      </Wrapper>
    </Container>
  );
};

export default LoginContainer;
