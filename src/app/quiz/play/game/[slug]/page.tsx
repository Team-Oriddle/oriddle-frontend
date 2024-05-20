"use client";
import { QuizGamePage } from "@/pages/quiz_game";

type QuizGameProps = {
  params: {
    slug: number;
  }
}

const GamePage = ({ params }:QuizGameProps) => {
  return <QuizGamePage QuizGameId = {params.slug}/>;
};

export default GamePage;
