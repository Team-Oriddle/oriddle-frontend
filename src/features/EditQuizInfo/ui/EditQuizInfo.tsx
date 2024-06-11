import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const EditQuizInfo = ({ title, editTitle, description,editDescription, isOpen, children, onClose, thumbnail, handlethumbnail}) => {


  const uploadingImage = (e: any) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
    handlethumbnail(e.target.files[0]);
  };

if (!isOpen) return null;

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalBox onClick={e => e.stopPropagation()}>
              <ImageInputContainer>
                {thumbnail === "" ? (
                  <ImageInput type="file" onChange={uploadingImage} />
                ) : (
                  // <Image
                  //   src={img}
                  //   alt="썸네일"
                  //   layout="fill"
                  //   objectFit="cover"
                  // />
                  <div>이미지</div>
                )}
              </ImageInputContainer>
              <InfoInputContainer>
                  <TitleInput 
                    onChange={(e)=>editTitle(e.target.value)} 
                    value={title} 
                    placeholder="제목을 입력해주세요"
                  ></TitleInput>
                  <DescriptionInput 
                    onChange={(e)=>editDescription(e.target.value)} 
                    value={description} 
                    placeholder='설명을 입력해주세요'
                  ></DescriptionInput>
                  <OtherSetting>
                    <div>공개모드</div>
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
`

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
`

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
    color: C0C0C0;
  }
  
`

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
    color: C0C0C0;
  }
`

const OtherSetting = styled.div`
  width: 700px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;
  color: white;
  background-color:#FD7400;
  text-align: center;
  border-radius: 50px;
`