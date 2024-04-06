import styled from "styled-components"

interface ButtonProps{
  color:string,
  txt:string
  //onClick함수
  //width
  //height
}

const ButtonLayout = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #643DD2;
  background-color: ${(props) => props.bgColor};
  color:${(props)=> props.txtColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20;
  font-weight: bold;
`

const DefalutButton = ({onClick,color,txt}:ButtonProps) =>{
  let bgColor: string;
  let textColor: string;

  switch (color) {
    case "보라":
      bgColor = "#643DD2";
      textColor = "#FFFFFF"
      break;
    // 다른 색상에 대한 처리도 추가 가능
    default:
      bgColor = "#FFFFFF"
      textColor = "#643DD2";
      break;
  }

  return(
    <ButtonLayout bgColor={bgColor} txtColor={textColor} onClick={onClick}>
      {txt}
    </ButtonLayout>
  )
}

export default DefalutButton