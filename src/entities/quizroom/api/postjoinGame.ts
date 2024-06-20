export const joinGame = (quizRoomId) => {
  return fetch(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/join`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .catch(error => {
    throw error;
  });
};

