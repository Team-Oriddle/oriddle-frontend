import styled from "styled-components"

const Wrapper = styled.div`
  width: 342px;
  height: 200px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  margin: 12px 0px
`

const SettingInfo = styled.div`
  width: 100%;
  height: 50px;
  font-size: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;  
`
const SettingOption = styled.div`
  width: 100%;
  height: 150px;
  overflow-y: scroll;
`

const SettingValue = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 50px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color:${(props) => (props.selected ? "#FD7400" : "white")};
  color:${(props) => (props.selected ? "white" : "black")};
  &:hover{
    background-color: #FD7400;
    cursor: pointer;
    color: white;
  }
  border-top: 0.1px solid #E0E0E0;//TODO: 추후에 변경
`

type EditQuizSettingProps = {
  EditTitle: string;
  EditOption: any[];
  Value:any;
  HandleEdit?: (value:any) => void;
}

export const EditQuizSetting = ({EditTitle, EditOption, Value, HandleEdit}:EditQuizSettingProps) =>{
  return(
    <Wrapper>
      <SettingInfo>{EditTitle}</SettingInfo>
      <SettingOption>
        {EditOption.map((option, index) => (
          <SettingValue 
            onClick={()=>HandleEdit(option)} 
            key={index}
            selected={option === Value}
          >{option}
          </SettingValue>
          ))}
      </SettingOption>
    </Wrapper>
  )
}

//TODO: 문제유형 벨류와 따라서 보여주는 값 다르게 하가