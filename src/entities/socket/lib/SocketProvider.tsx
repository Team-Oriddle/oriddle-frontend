import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

     //여기서 어떤 페이지에 연결이 되었다는 확답을 받아야함

    const [client, setClient] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                setConnected(true);
            },
            onDisconnect: () => {
                setConnected(false);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    return(
    <SocketContext.Provider  value={{client, connected}}>
        {children}
    </SocketContext.Provider>
    )
};

export const useStomp = () => {
    return useContext(SocketContext);
};