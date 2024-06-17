"use client";

import { QuizResultPage } from "@/pages/quiz_result_page";

const QuizResultAppPage = ({ params }: { params: { quizRoomId: string,resultId:string } }) => {
  return <QuizResultPage quizRoomId={params.quizRoomId} resultId={params.resultId} />;
};

export default QuizResultAppPage;
