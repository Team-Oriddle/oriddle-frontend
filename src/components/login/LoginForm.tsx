// LoginForm.tsx
import React from "react";
import styled from "styled-components";

const Form = styled.div`
  .text-lg {
    font-size: 1.125rem;
    font-weight: 600;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .mt-6 {
    margin-top: 1.5rem;
  }
  .bg-blue-600 {
    background-color: #2563eb;
  }
  .bg-red-500 {
    background-color: #ef4444;
  }
  input,
  button {
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 0.25rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  button {
    color: white;
    font-weight: medium;
  }
`;

export const LoginForm = () => {
  const socialLogin = (provider: "google" | "facebook") => {
    const redirectEndPoint = encodeURIComponent("/");
    const baseUrl = `http://localhost:8080/api/v1/login/${provider}?redirectEndPoint=${redirectEndPoint}`;
    console.log(`소셜 로그인 시도 - ${provider}`);
    window.location.href = baseUrl;
  };

  return (
    <Form className='login-form'>
      <h3 className='text-lg font-semibold'>로그인</h3>
      <div className='mt-4'>
        <label
          htmlFor='login-email'
          className='block text-sm font-medium text-gray-700'>
          이메일
        </label>
        <input
          type='email'
          id='login-email'
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm'
          required
        />
      </div>
      <div className='mt-4'>
        <label
          htmlFor='login-password'
          className='block text-sm font-medium text-gray-700'>
          비밀번호
        </label>
        <input
          type='password'
          id='login-password'
          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm'
          required
        />
      </div>
      <div className='mt-6'>
        <button className='w-full px-4 py-2 text-white bg-blue-600 rounded-md'>
          로그인
        </button>
      </div>
      <div className='flex flex-col mt-6 space-y-2'>
        <button
          onClick={() => socialLogin("google")}
          className='flex items-center justify-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-lg'>
          <span>Google로 로그인하기</span>
        </button>
        <button
          onClick={() => socialLogin("facebook")}
          className='flex items-center justify-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg'>
          <span>Facebook으로 로그인하기</span>
        </button>
      </div>
    </Form>
  );
};
