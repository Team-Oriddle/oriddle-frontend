import { userAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useSocialLogin = () => {
  const router = useRouter();
  const [authState] = useAtom(userAtom);

  const socialLogin = useCallback(
    (provider: "google" | "facebook") => {
      // 현재 페이지 URL을 세션 스토리지에 저장합니다.
      localStorage.setItem("redirectUrl", window.location.href);

      const redirectEndPoint = "/auth/callback";
      const baseUrl = `http://localhost:8080/api/v1/login/${provider}?redirectEndPoint=${redirectEndPoint}`;
      console.log(`소셜 로그인 시도 - ${provider}`);
      router.push(baseUrl);
    },
    [router]
  );

  const checkLogin = useCallback(() => {
    if (authState.isLoggedIn === false) {
      alert("로그인이 필요합니다");
      socialLogin("google"); // 기본적으로 Google 로그인으로 리디렉션
      return false;
    }
    return true;
  }, [socialLogin, authState]);

  return { socialLogin, checkLogin };
};
