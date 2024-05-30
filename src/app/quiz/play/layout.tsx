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

  return (
    <SocketProvider> 
      <main>{children}</main>
    </SocketProvider>
  )
}

