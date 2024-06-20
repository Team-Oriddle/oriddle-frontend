import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const EditQuizInfo = ({ title, editTitle, description, editDescription, isOpen, children, onClose, thumbnail, handlethumbnail,gpt }) => {

  const uploadingImage = (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]); // 이미지 파일을 FormData에 추가

    const uploadImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/quiz/image`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );
        const data = await response.json();
        handlethumbnail(data.data.url);
        console.log(data);
      } catch (error) {
        alert("이미지 업로드에 실패했습니다.");
      }
    };

    uploadImage();
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <ImageInputContainer>
          {thumbnail === "" ? (
            <ImageInput type="file" onChange={uploadingImage} />
          ) : (
            <Image
              src={thumbnail}
              alt="썸네일"
              layout="fill"
              objectFit="cover"
            />
          )}
        </ImageInputContainer>
        <InfoInputContainer>
          <TitleInput 
            onChange={(e) => editTitle(e.target.value)} 
            value={title} 
            placeholder="제목을 입력해주세요"
          />
          <DescriptionInput 
            onChange={(e) => editDescription(e.target.value)} 
            value={description} 
            placeholder="설명을 입력해주세요"
          />
          <OtherSetting>
            <div onClick={()=>gpt(title,description)}>GPT로 만들기 </div>
            <SButton onClick={onClose}>다음</SButton>
          </OtherSetting>
        </InfoInputContainer>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageInputContainer = styled.div`
  width: 600px;
  height: 400px;
  margin: 10px;
  background-color: white;
  border-radius: 20px;
`;

const InfoInputContainer = styled.div`
  width: 830px;
  height: 400px;
  margin: 10px;
  border-radius: 20px;
  background-color: white;
  padding: 32px 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyleInput = styled.input`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
`;

const ImageInput = styled(StyleInput)``;

const TitleInput = styled.input`
  width: 700px;
  height: 50px;
  font-size: 24px;
  background-color: white;
  font-weight: 500;
  outline: none;
  border: none;
  color: black;
  ::placeholder {
    color: #C0C0C0;
  }
`;

const DescriptionInput = styled.textarea`
  width: 700px;
  height: 200px;
  font-size: 20px;
  background-color: white;
  font-weight: 400;
  outline: none;
  border: none;
  resize: none;
  color: black;
  ::placeholder {
    color: #C0C0C0;
  }
`;

const OtherSetting = styled.div`
  width: 700px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;
  color: white;
  background-color: #FD7400;
  text-align: center;
  border-radius: 50px;
`;
