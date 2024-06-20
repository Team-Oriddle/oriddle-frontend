import { useEffect, useState } from "react";
import styled from "styled-components";

export const AddQuizType = ({ quizList, quizIndex, selectedQuiz, handleEditMainAnswers, handleEditOptionAnswer, handleDeleteOptionAnswer, handleAddOptionAnswer }) => {
  const [isAnswerTrue, setIsAnswerTrue] = useState<boolean>(null);

  return (
    <>
      {
        selectedQuiz.type === "MULTIPLE_CHOICE" ? (
          <MutipleChoiceWrapper>
            추후에 객관식을 구현하는 컴포넌트입니다
          </MutipleChoiceWrapper>
        ) : (
          selectedQuiz.type === "TRUE_FALSE" ? (
            <AnswerOXWrapper>
              <AnswerOXChoose
                isSelected={isAnswerTrue === true}
                onClick={() => setIsAnswerTrue(true)}
              >O</AnswerOXChoose>
              <AnswerOXChoose
                isSelected={isAnswerTrue === false}
                onClick={() => setIsAnswerTrue(false)}
              >X</AnswerOXChoose>
            </AnswerOXWrapper>
          ) : (
            <>
              <AnswerInput
                placeholder="정답을 입력해주세요"
                value={selectedQuiz.answers[0] ?? ""}
                onChange={(e) =>
                  handleEditMainAnswers(selectedQuiz.number, e.target.value)
                }
              ></AnswerInput>
              <OtherAnswerInput>
                {selectedQuiz.answers
                  .slice(1)
                  .map((answer: any, index: number) => (
                    <AnswerWrapper key={index + 1}>
                      <OptionAnswerInput
                        value={answer}
                        onChange={(e) =>
                          handleEditOptionAnswer(index + 1, e.target.value)
                        }
                      />
                      <DeleteButton onClick={() => handleDeleteOptionAnswer(index + 1)}>
                        X
                      </DeleteButton>
                    </AnswerWrapper>
                  )) ?? null}
                <AnswerOptionButton onClick={handleAddOptionAnswer}>
                  +
                </AnswerOptionButton>
              </OtherAnswerInput>
            </>
          )
        )
      }
    </>
  )
}
const StyleInput = styled.input`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
`;

const AnswerInput = styled(StyleInput)`
  width: 100%;
  height: 150px;
  margin: 10px 0px;
  font-size: 28px;
`;

const AnswerOXWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
`

const AnswerOXChoose = styled.div<{isSelected: boolean}>`
  width: 400px;
  height: 300px;
  background-color:${(props) => (props.isSelected ? "#FD7400" : "white")};
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  font-size: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color:${(props) => (props.isSelected ? "white" : "#FD7400")};
  &:hover{
    background-color: #FD7400;
    color: white;
  }
`

const OtherAnswerInput = styled.div `
  width: 100%;
  height: 150px;
  margin: 10px 0px;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
  overflow-y: scroll;
`

const AnswerOptionButton = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 30px;
  text-align: center;
  &:hover {
    background-color: #FD7400;
    color: white;
  }
`;

const OptionAnswerInput = styled.input`
  background-color: white;
  font-size: 32px;
  width: calc(100% - 40px);
  height: 60px;
  margin-right: 10px;
  color: black;
  background-color: white;
  border: none;
  text-align: center;
`;

const DeleteButton = styled.button`
  color: #643dd2;
  font-weight: bold;
  background-color: white;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AnswerWrapper = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  width: 100%;
`;

const MutipleChoiceWrapper = styled.div`
  width :100%;
  height: 400px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));

`