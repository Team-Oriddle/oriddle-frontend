"use client";
import GameContainer from "@/containers/game/GameContainer";

type Props = {
  params: {
    slug: number;
  }
}

const GamePage = ({ params }:Props) => {
  return <GameContainer quizId = {params.slug}/>;
};

export default GamePage;
