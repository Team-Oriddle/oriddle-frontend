import axios from "axios";

export const getQuizRoomData = async (quizRoomId:number) => {
  let QuizRoomData
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    QuizRoomData = response.data.data
    console.log(response.data.data)
  } catch (error) {
    console.error(error);
  }
  return QuizRoomData;
};