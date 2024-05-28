'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    console.log(children)
     //여기서 어떤 페이지에 연결이 되었다는 확답을 받아야함
    const QuizroomId = children.props.children.props.childProp.segment[1]
    console.log(children.props.children.props.childProp.segment[1])//id 찾는 방법
    const [client, setClient] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                console.log('연결되었습니다')
                setConnected(true);
                stompClient?.subscribe(`topic/quiz-room/${QuizroomId}/join`,(message)=>{
                    console.log(message)
                })
                console.log('join 구독')
                stompClient?.subscribe(`topic/quiz-room/${QuizroomId}/start`,(message)=>{
                    console.log(message)
                })
                console.log('start 구독')
                stompClient?.subscribe(`topic/quiz-room/${QuizroomId}/leave`,(message)=>{
                    console.log(message)
                })
                console.log('leave 구독')

            },
            onDisconnect: () => {
                console.log('연결 끊김')
                setConnected(false);
            },
            debug: (str) => {
                console.log(str);
            },
            onStompError: (frame) => {
                console.log('소켓 안됨 ')
                console.error('Error!: ' + frame.headers['message']);
                console.error(frame.body);
            },
        });
        stompClient.activate();
        setClient(stompClient);

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