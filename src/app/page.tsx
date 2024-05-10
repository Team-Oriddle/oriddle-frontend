"use client";
import MainContainer from "@/containers/main/MainContainer";
import { userAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function MainPage() {
  const [, setAuthState] = useAtom(userAtom);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") as string); // 세션 스토리지에서 사용자 데이터 읽기
    if (user) {
      setAuthState({ isLoggedIn: true, user });
    }
  }, [setAuthState]);

  return <MainContainer />;
}
