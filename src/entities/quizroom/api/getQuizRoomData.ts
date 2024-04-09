import axios from "axios";

const getQuizRoomData = async (quizRoomId:number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export default getQuizRoomData