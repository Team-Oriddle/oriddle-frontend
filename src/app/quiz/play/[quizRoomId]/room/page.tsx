"use client";
import { QuizRoomPage } from "@/pages/quiz_room";

type QuizRoomProps = {
  params: {
    quizRoomId: string;
    resultId: string;
  }
}

const AttendPage = ({ params }:QuizRoomProps) => {
  return <QuizRoomPage  QuizroomId = {params.quizRoomId}/>;
};

export default AttendPage;
