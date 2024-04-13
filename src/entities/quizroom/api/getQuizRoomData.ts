import axios from "axios";

const getQuizRoomData = async (quizRoomId:number) => {
  let QuizRoomData
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
    QuizRoomData = response.data.data
  } catch (error) {
    console.error(error);
  }
  return QuizRoomData;
};

export default getQuizRoomData