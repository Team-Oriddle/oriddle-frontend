import styled from "styled-components"

const Layout = styled.div`
  grid-column: 1/13;
  background-color: white;
  height: 70px;
  color: black;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));

`

export const Question = ({description,number,type,score}) => {
  let typeByKorean ='기타'
  if(type === 'SHORT_ANSWER'){
    typeByKorean = "객관식"
  }else{
    typeByKorean = "주관식"
  }

  return(
    <Layout>
      [{number}/30] {description} ({typeByKorean}, {score}점)
    </Layout>
  )
}