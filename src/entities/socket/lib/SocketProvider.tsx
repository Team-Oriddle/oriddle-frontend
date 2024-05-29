'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { initializeSocket } from '../socket';

interface UserData{
    nickname:string,
    position: number,
    userId:number,
    isHost:Boolean
}

interface SocketContextType {
    client: Client | null;
    connected: boolean;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }) => {
    const [client, setClient] = useState<Client>(null);
    const [connected, setConnected] = useState(false);

    const setNewSocket =async () => {
        try {
            const newSocket = await initializeSocket('ws://localhost:8080/ws',[])
            setClient(newSocket)
            setConnected(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setNewSocket()
    }, []);

    useEffect
    
    return(
    <SocketContext.Provider  value={{client, connected}}>
        {children}
    </SocketContext.Provider>
    )
};

export const useStomp = () => {
    return useContext(SocketContext);
};