"use client";
import { QuizRoomPage } from "@/pages/quiz_room";

type QuizRoomProps = {
  params: {
    slug: number;
  }
}

const AttendPage = ({ params }:QuizRoomProps) => {
  return <QuizRoomPage  QuizroomId = {params.slug}/>;
};

export default AttendPage;