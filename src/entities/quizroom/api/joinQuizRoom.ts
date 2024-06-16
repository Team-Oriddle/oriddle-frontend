export const joinQuizRoom = async (roomId: string, router) => {
  try{
    const response = await fetch(`http://localhost:8080/api/v1/quiz-room/${roomId}/join`,{
      method:'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}),
    })
  }catch(error:any){
    alert("게임에 참여할 수 없습니다!")
    if (error.response && error.response.status !== 409) {
      console.log('401');
      const redirectEndPoint = encodeURIComponent(`/quiz/play/${roomId}/room`);
      window.location.href = `http://localhost:8080/api/v1/login/google?redirectEndPoint=${redirectEndPoint}`;
    }
  }
  router.push(`/quiz/play/${roomId}/room`);
};
