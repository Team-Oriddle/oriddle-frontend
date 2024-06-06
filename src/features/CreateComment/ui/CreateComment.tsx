import styled from "styled-components"

const Layout = styled.div`
  width: 1440px;
  height: 290px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 22px;
  margin-bottom: 22px;
`
const UserIcon = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  background-color: purple;
`
const TextInputLayout = styled.div`
  width: 1318px;
  height: 100%;
  border: 1px solid #C0C0C0;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`
const CommentInput = styled.input`
  width: 1200px;
  height: 120px;
  background-color: white;
  margin: 20px;
  color: black;
  border: none;
  font-size: 22px;
  :focus{
    border: none;
  }
`
const OtherInputLayout = styled.div`
  width: 1200px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
export const CreateComment = () => {

  return(
    <Layout>
      <UserIcon></UserIcon>
      <TextInputLayout>
        <CommentInput placeholder="댓글 입력하기..."></CommentInput>
        <OtherInputLayout>
          <div>
            퀴즈 생성 부 보류
          </div>
        </OtherInputLayout>
      </TextInputLayout>
    </Layout>
  )
}