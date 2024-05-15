"use client";

import { QuizResultPage } from "@/pages/quiz_result_page";

const QuizResultAppPage = ({ params }: { params: { slug: string } }) => {
  return <QuizResultPage slug={params.slug} />;
};

export default QuizResultAppPage;
