'use client'
import { SocketProvider } from "@/entities/socket/lib/SocketProvider";
import { useState } from "react";

interface UserData{
  nickname:string,
  position: number,
  userId:number,
  isHost:Boolean
}

export default function Layout({ children }) {

  const [userData, setUserData] = useState<UserData[]>([]); 

  //여기서 소켓 프로바이더로 넘겨줌
  return (
    <SocketProvider> 
      <main>{children}</main>
    </SocketProvider>
  )
}

//얘가 SPA 레이아웃임 ㅇ