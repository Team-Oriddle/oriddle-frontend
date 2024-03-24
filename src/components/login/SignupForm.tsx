import React from "react";
import styled from "styled-components";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
`;

const FormField = styled.div`
  margin-top: 1rem; /* mt-4 */
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #4b5563; /* text-gray-700 */
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.25rem; /* mt-1 */
  padding: 0.5rem; /* px-4, py-2 */
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid #d1d5db; /* border-gray-300 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.5rem; /* mt-6 */
  padding: 0.5rem 1rem; /* px-4, py-2 */
  color: white;
  background-color: #10b981; /* bg-green-600 */
  border-radius: 0.375rem; /* rounded-md */
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem; /* px-4, py-2 */
  margin-top: 0.5rem; /* space-y-2 */
  color: white;
  border-radius: 0.5rem; /* rounded-lg */
  font-weight: medium;

  &.google {
    background-color: #ef4444; /* bg-red-500 */
  }

  &.facebook {
    background-color: #2563eb; /* bg-blue-600 */
  }
`;

export const SignupForm = () => {
  const socialLogin = (provider: "google" | "facebook") => {
    console.log(`${provider}로 가입 시도`);
    // 여기에 실제 소셜 가입 로직 구현
  };

  return (
    <StyledForm>
      <Title>회원가입</Title>
      <FormField>
        <Label htmlFor='signup-email'>이메일</Label>
        <Input type='email' id='signup-email' required />
      </FormField>
      <FormField>
        <Label htmlFor='signup-password'>비밀번호</Label>
        <Input type='password' id='signup-password' required />
      </FormField>
      <Button>가입하기</Button>
      <FormField>
        <SocialButton className='google' onClick={() => socialLogin("google")}>
          <span>Google로 가입하기</span>
        </SocialButton>
        <SocialButton
          className='facebook'
          onClick={() => socialLogin("facebook")}>
          <span>Facebook으로 가입하기</span>
        </SocialButton>
      </FormField>
    </StyledForm>
  );
};
