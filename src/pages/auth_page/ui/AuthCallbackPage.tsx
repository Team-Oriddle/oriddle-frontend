import { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom } from "@/store/userAtom";
import axios from "axios";

export const AuthCallbackPage = () => {
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    // API endpoint from where we can fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/info",
          {
            headers: {
              "Content-Type": "application/json",
              // Include authentication token if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser((prevState) => ({
          ...prevState,
          id: userData.id,
          name: userData.name,
          provider: userData.provider,
          email: userData.email,
        }));

        router.push("/"); // Redirect to home after successful login
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login"); // Redirect to login page on failure
      }
    };

    fetchUserData();
  }, [setUser, router]);

  return <div>로그인 중...</div>;
};
