import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const EditQuizRoomInfo = ({ quizRoomId, roomData, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [maxParticipant, setMaxParticipant] = useState(0);

  useEffect(() => {
    if (roomData) {
      setTitle(roomData.roomTitle || '');
      setMaxParticipant(roomData.maxParticipant || 0);
    }
  }, [roomData, isOpen]);

  const HandleMaxParticipant = (number) => {
    const participantNumber = parseInt(number, 10);
    if (participantNumber < roomData.participants.length) {
      alert("참가자 수보다 적게 설정할 수 없습니다.");
      return;
    }
    setMaxParticipant(participantNumber);
  };

  const postQuizRoomSetting = async () => {
    console.log(quizRoomId);
    try {
      await axios.post(`http://localhost:8080/api/v1/quiz-room/${quizRoomId}/edit`, {
        title: title,
        maxParticipant: maxParticipant
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert("설정이 변경되었습니다!");
    } catch (error) {
      console.log(error);
      alert("설정 변경에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <UserInputContainer>
          <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요"></TextInput>
          <TextInput placeholder="비밀번호"></TextInput>
          <PlayerInput>
            <UserText>
              <div>플레이어</div>
              <div>{maxParticipant}</div>
            </UserText>
            <SliderInput
              type='range'
              min='2'
              max='8'
              value={maxParticipant}
              onChange={(e) => HandleMaxParticipant(e.target.value)}
            ></SliderInput>
          </PlayerInput>
        </UserInputContainer>
        <StyledButton onClick={postQuizRoomSetting}>저장</StyledButton>
      </ModalBox>
    </ModalBackdrop>
  );
};

//TODO: 공개 비공개 기능 추가시 비밀번호 설정

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 20px;
  padding: 28px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
`;

const TextInput = styled.input`
  width: 247px;
  height: 50px;
  font-size: 16px;
  background-color: white;
  font-weight: 500;
  outline: none;
  border: none;
  color: black;
  ::placeholder {
    color: #C0C0C0;
  }
`;

const UserText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0px;
`;

const PlayerInput = styled.div`
  display: flex;
  width: 248px;
  flex-direction: column;
`;

const SliderInput = styled.input`
  color: #FD7400;
`;

const StyledButton = styled.button`
  width: 96px;
  height: 40px;
  font-size: 20px;
  background-color: #FD7400;
  color: white;
  text-align: center;
  border-radius: 50px;
  font-weight: bold;
`;

const UserInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
