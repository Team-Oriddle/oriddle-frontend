export const getQuizListData = async () => {
  let quizRoomData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/quiz/page/0`, {
      method: 'GET',
      credentials: 'include', // withCredentials: true에 해당하는 옵션
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    quizRoomData = data.data.quizzes;
    console.log(data.data.quizzes);
  } catch (error) {
    console.error('Error fetching quiz room data:', error);
  }
  return quizRoomData;
};
