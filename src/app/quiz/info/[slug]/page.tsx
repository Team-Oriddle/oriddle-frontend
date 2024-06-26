"use client";
import { QuizInfoPage } from "@/pages/quiz_info";

type Props = {
  params: {
    slug:string;
  }
}

const DetailPage = ({ params }:Props) => {
  return <QuizInfoPage quizId = {params.slug}/>;
};

export default DetailPage;