import styled from "styled-components";

const Layout = styled.div`
  width: 70%;
  background-color: white;
  height: 40vw;
  color: black;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin: 20px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
`;


const Music = styled.iframe`
  width: 100%;
  height: 100%;
  display: none;
`;

export const QuizSource_Mobile = ({ url, sourceType }) => {
  return (
    <Layout>
      {sourceType === "IMAGE" && <Image src={url} alt="Source Image" />}
      {sourceType === "VIDEO" && (
        <Video
          src={url}
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      )}
      {sourceType === "SOUND" &&
      <Music
          src={url}
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />}

    </Layout>
  );
};

//코드 수정
