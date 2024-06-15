export const postQuizRoom = async (
  QuizId,
  quizRoomTitle,
  userNumber,
  router,
  checkLogin
) => {
  if (checkLogin() === false) {
    return;
  }
  try {
    const response = await fetch('http://localhost:8080/api/v1/quiz-room', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizId: QuizId,
        title: quizRoomTitle,
        maxParticipant: userNumber,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    router.push(`/quiz/play/${data.data.quizRoomId}/room`);
  } catch (error) {
    console.error(error);
    alert('방에 참가해있습니다!');
  }
};
