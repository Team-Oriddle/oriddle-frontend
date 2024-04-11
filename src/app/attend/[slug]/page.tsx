"use client";
import AttendContainer from "@/containers/attend/AttendContainer";
import QuizRoomPage from "@/pages/quiz_room/ui/quizRoomPage";

type Props = {
  params: {
    slug: number;
  }
}

const AttendPage = ({ params }:Props) => {
  return <QuizRoomPage  roomId = {params.slug}/>;
};

export default AttendPage;
