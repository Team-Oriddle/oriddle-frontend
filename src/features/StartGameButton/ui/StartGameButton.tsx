import { useRouter } from "next/navigation"
import styled from "styled-components"

const Layout = styled.div`
  width: 342px;
  height: 70px;
  border-radius: 50px;
  background-color: #FD7400;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin: 20px  0px;
  margin-left: 24px;
`

type StartGameProps = {
  roomId :string
}

export const StartGameButton = ({roomId}:StartGameProps) => {
  //TODO: API로 로직을 빼내야 하는지 추후에 고민

  const navigate = useRouter();
  const PressStartGameButton = async(roomId:string) =>{
    try{
      const response = await fetch(`http://localhost:8080/api/v1/quiz-room/${roomId}/start`,{
        method:'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }catch(error:any){
      console.log(error)
    }
    //response필요 없음
  }
  
  return(
    <Layout onClick={()=>PressStartGameButton(roomId)}  >
      게임 시작
    </Layout>
  )
}