"use client";
import { QuizGamePage } from "@/pages/quiz_game";

type QuizGameProps = {
  params: {
    quizRoomId: string;
  }
}

const GamePage = ({ params }:QuizGameProps) => {
  return <QuizGamePage QuizGameId = {params.quizRoomId}/>;
};

export default GamePage;
