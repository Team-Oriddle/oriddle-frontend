import { joinQuizRoom } from "@/entities/quizroom";
import { joinGame } from "@/entities/quizroom/api/postjoinGame";
import { getUserData } from "@/entities/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const QuizAccessPage = ({ quizId }) => {
  const router = useRouter();

  useEffect(()=>{
    getUserData().then((data) => {
      console.log(data)
      if(data.code === "US0001"){
        joinQuizRoom(quizId, router).then((data) => {
          
        }).catch((error) => { 

        })
      }
      else{
        alert("로그인이 필요합니다!")
        sessionStorage.setItem("redirectUrl", window.location.href);
        router.push('/login')
      }
    }).catch((error) => {
      console.log("에러")
      alert("로그인이 필요합니다!")
      sessionStorage.setItem("redirectUrl", window.location.href);
      router.push('/login')
    })
  },[quizId])
  return <div>접속중입니다</div>
};