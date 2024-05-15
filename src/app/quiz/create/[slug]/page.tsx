"use client";
import { QuizCreatePage } from "@/pages/quiz_create/ui/QuizCreatePage";

type QuizGameProps = {
  params: {
    slug: number;
  }
}

const GamePage = ({ params }:QuizGameProps) => {
  return <QuizCreatePage QuizGameId = {params.slug}/>;
};

export default GamePage;
