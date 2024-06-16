export const startQuizRoom = async (roomId: string) => {
  try{
    const response = await fetch(`http://localhost:8080/api/v1/quiz-room/${roomId}/start`,{
      method:'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }catch(error:any){
    alert("게임을 시작할 수 없습니다.")
  }
};
