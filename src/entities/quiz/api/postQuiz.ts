export const postQuiz = async (
  quizTitle,
  description,
  image,
  qustList,
  router
) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/quiz", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: quizTitle,
        description: description,
        image: image,
        questions: qustList,
      }),
    });
    alert("생성되었습니다");
    console.log(response);
    // router.push(`/quiz/info/${response.data.data.quizId}`);
  } catch (error) {
    return error;
  }
};
//TODO: router가 매개변수로 필요한가 확인
