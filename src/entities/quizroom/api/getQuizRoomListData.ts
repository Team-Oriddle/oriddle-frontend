export const getQuizRoomListData = async () => {
  let quizRoomListData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/quiz-room/page/0`, {
      method: 'GET',
      credentials: 'include', // withCredentials: true에 해당하는 옵션
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    quizRoomListData = data.data;
    console.log(data.data);
  } catch (error) {
    return error;
  }
  return quizRoomListData;
};