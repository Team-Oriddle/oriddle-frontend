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
`

const SettingOption = styled.div`
  width: 100%;
  height: 150px;
  overflow-y: scroll;
`



export const EditQuizSetting = () =>{
  return(
    <Wrapper>
      <SettingInfo>문제 유형</SettingInfo>
      <SettingOption>
        <SettingInfo>dd</SettingInfo>
        <SettingInfo>dd</SettingInfo>
        <SettingInfo>dd</SettingInfo>
        <SettingInfo>dd</SettingInfo>
      </SettingOption>
    </Wrapper>
  )
}