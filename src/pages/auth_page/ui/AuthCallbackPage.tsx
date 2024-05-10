import { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom } from "@/store/userAtom";
import axios from "axios";

export const AuthCallbackPage = () => {
  const [, setAuthState] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    // API endpoint from where we can fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/info",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              // Include authentication token if needed
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }

        const userData = response.data;
        sessionStorage.setItem("user", JSON.stringify(userData)); // 세션 스토리지에 사용자 데이터 저장

        setAuthState((prevState) => ({
          ...prevState,
          isLoggedIn: true,
          user: userData,
        }));

        router.push("/"); // Redirect to home after successful login
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login"); // Redirect to login page on failure
      }
    };

    fetchUserData();
  }, [setAuthState, router]);

  return <div>로그인 중...</div>;
};
