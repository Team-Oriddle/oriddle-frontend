import styled from "styled-components";

type ButtonLayoutType = {
  bgColor: string;
  txtColor: string;
};

const ButtonLayout = styled.button<ButtonLayoutType>`
  width: 150px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #000000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.txtColor};
  cursor: pointer; // 버튼의 경우 :hover에서 pointer로 주지 않아도 기본적으로 커서가 pointer로 변경됩니다.
`;

type ButtonProps = {
  color: string; // '보라' | '하양'과 같은 문자열로 동적인 색상 변경을 위한 타입
  txt: string;
  /** 현재 모든 버튼에 클릭 이벤트가 들어있지는 않습니다. */
  onClick?: () => void;
};

// color 값 초기값 설정
const DefalutButton = ({ color = "검정", txt = "", onClick }: ButtonProps) => {
  // 코드 안정성을 위해 let 대신 const 사용으로 변경
  // TODO: Custom Pallette 생성 후 코드 이동
  const customBlack: string = "#000000";
  const customWhite: string = "#FFFFFF";
  const bgColor: string = color === "검정" ? customBlack : customWhite;
  const textColor: string = color === "검정" ? customWhite : customBlack;

  return (
    <ButtonLayout bgColor={bgColor} txtColor={textColor} onClick={onClick}>
      {txt}
    </ButtonLayout>
  );
};

export default DefalutButton;
