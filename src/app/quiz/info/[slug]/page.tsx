"use client";
import QuizInfoPage from "@/pages/quiz_info/ui/quizInfoPage";

type Props = {
  params: {
    slug: number;
  }
}

const DetailPage = ({ params }:Props) => {
  return <QuizInfoPage quizId = {params.slug}/>;
};

export default DetailPage;