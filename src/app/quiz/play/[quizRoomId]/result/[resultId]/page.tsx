"use client";

import { QuizResultPage } from "@/pages/quiz_result_page";

const QuizResultAppPage = ({ params }: { params: { quizRoomId: string } }) => {
  return <QuizResultPage slug={params.quizRoomId} />;
};

export default QuizResultAppPage;
