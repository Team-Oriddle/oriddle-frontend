"use client";
import { QuizRoomPage } from "@/pages/quiz_room";

type Props = {
  params: {
    slug: number;
  }
}

const AttendPage = ({ params }:Props) => {
  return <QuizRoomPage  roomId = {params.slug}/>;
};

export default AttendPage;
