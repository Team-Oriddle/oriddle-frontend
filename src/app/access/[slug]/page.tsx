"use client";
import { QuizAccessPage } from "@/pages/quiz_access";
import { QuizInfoPage } from "@/pages/quiz_info";

type Props = {
  params: {
    slug:string;
  }
}

const AccessPage = ({ params }:Props) => {
  return <QuizAccessPage quizId = {params.slug}/>;
};

export default AccessPage;