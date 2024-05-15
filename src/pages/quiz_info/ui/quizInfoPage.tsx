import DefalutButton from "@/components/common/DefalutButton";
import { QuizInfo } from "@/components/detail/QuizInfo";
import Modal from "@/components/game/Modal";
import { Header } from "@/components/header/Header";
import { CreateComment } from "@/features/CreateComment/ui/CreateComment";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh; // Viewport Height
  width: 100vw; // Viewport Width
  min-width: 100vw;
  background-color: white;
  color: black;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
`
const CommentLayout = styled.div`
  width: 1440px;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  grid-column: 1/13;
  margin-top: 10px;
  margin-bottom: 10px;
`

const UserIcon = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  background-color: purple;
`

const TextInputLayout = styled.div`
  width: 1318px;
  border: 1px solid #C0C0C0;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`

const UserEvaluateButtonLayout = styled.div`
  width: 320px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const UserEvaluateQuizLayout = styled.div`
  grid-column: 1/13;
  height: 160px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

type Props = {
  quizId :number
}

const QuizInfoPage = ({quizId}:Props) => {

  const commentList = [
    {
      id:0,
      user:"굳건한오리123",
      comment:"댓글 내용입니다 지금은 임의로 작성했는데 추후에 수정할 예정입니다",
    },
    {
      id:1,
      user:"굳건한오리123",
      comment:"댓글 내용입니다 지금은 임의로 작성했는데 추후에 수정할 예정입니다",
    }
  ]

  return (
    <Container>
      <Wrapper>
        <Header></Header>
        {/* //TODO:퀴즈 생성 모달 클릭시 헤더 CSS 변경이 있어야함 */}
        <QuizInfo quizId={quizId} ></QuizInfo>
        <UserEvaluateQuizLayout>
          <UserEvaluateButtonLayout>
            <DefalutButton color="" txt="추천 561" ></DefalutButton>
            <DefalutButton color="보라" txt="신고"></DefalutButton>
          </UserEvaluateButtonLayout>
        </UserEvaluateQuizLayout>
        {/* TODO: 댓글은 댓글 관련된 협의 종료된 이후 진행 */}
        <CreateComment></CreateComment>
        {commentList.map((comment)=>(
          <CommentLayout key={comment.id}>
            <UserIcon></UserIcon>
            <TextInputLayout>{comment.comment}</TextInputLayout>
          </CommentLayout>
        ))}
      </Wrapper>
    </Container>
  );
};

export default QuizInfoPage;
