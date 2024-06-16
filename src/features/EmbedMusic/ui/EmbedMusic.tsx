import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

export const EmbedMusic = ({ isOpen, onClose, setSource, selectedQuiz }) => {
  const [inputYoutubeUrl, setInputYoutubeUrl] = useState("");
  const [embedYoutubeUrl, setEmbedYoutubeUrl] = useState("");
  const [isSetSource, setIsSetSource] = useState(false);

  const memoizedSetSource = useCallback(setSource, [setSource]);

  // 유튜브 넣을꺼라고 선택
  // 유튜브 링크 입력
  // 링크가 입력되면 
  useEffect(() => {
    if (!inputYoutubeUrl) return;
    setEmbedYoutubeUrl(extractYouTubeID(inputYoutubeUrl));
  }, [inputYoutubeUrl]);

  // TODO: 변수명 SOUND로 변경
  useEffect(() => {
    if (isSetSource) {
      memoizedSetSource(selectedQuiz, "sourceType", "SOUND");
      setIsSetSource(false);
      setInputYoutubeUrl("");
      onClose();
    }
  }, [isSetSource, memoizedSetSource, onClose, selectedQuiz]);

  const handlesetYoutubeUrl = () => {
    if (inputYoutubeUrl === "") {
      alert("유튜브 링크를 입력해주세요");
      return;
    }
    memoizedSetSource(selectedQuiz, "source", `https://www.youtube.com/embed/${embedYoutubeUrl}?autoplay=1`);
    setIsSetSource(true);
  };

  function extractYouTubeID(url) {
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        유튜브 링크를 입력해주세요
        <StyleInput type="text" value={inputYoutubeUrl} onChange={(e) => setInputYoutubeUrl(e.target.value)}></StyleInput>
        {inputYoutubeUrl && 
          <iframe 
            width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${embedYoutubeUrl}?autoplay=1`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        }
        <button onClick={handlesetYoutubeUrl}>확인</button>
      </ModalBox>
    </ModalBackdrop>
  );
};

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
`;

const StyleInput = styled.input`
  height: 24px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
  font-size: 20px;
`; 
