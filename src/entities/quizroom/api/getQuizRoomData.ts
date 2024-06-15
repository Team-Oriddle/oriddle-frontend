export const getQuizRoomData = async (quizRoomId: string) => {
  let quizRoomData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`, {
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
    quizRoomData = data.data;
    console.log(data.data);
  } catch (error) {
    console.error('Error fetching quiz room data:', error);
  }
  return quizRoomData;
};
