import Image from "next/image";
import styled from "styled-components";
import youtube from 'public/youtube.png';
import Music from 'public/Youtube_Music.png';



export const AddQuizSource = ({ selectedQuiz, toggleMusicModal, toggleYoutubeModal, uploadingImage }) => {
  return(
    <SourceInput>
      {selectedQuiz?.sourceType !== "" ? (
        selectedQuiz?.sourceType === "IMAGE" ? (
          <Image
            src={selectedQuiz?.source}
            alt="썸네일"
            layout="fill"
            objectFit="cover"
          />
        ) : selectedQuiz?.sourceType === "VIDEO" ? (
            <iframe 
              width="350" 
              height="250" 
              src={selectedQuiz?.source}
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            ) : (
            <iframe 
              width="350" 
              height="250" 
              src={selectedQuiz?.source}
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            )
          ) : (
            <SourceTypeChoose>
              <ImageInput type="file" onChange={uploadingImage} />
              <YoutubeEmbedButton onClick={toggleYoutubeModal}>
                <StyledImage
                  src={youtube}
                  alt="유튜브"
                  layout="fill"
                  objectFit="cover"
                />
              </YoutubeEmbedButton>
              <YoutubeEmbedButton onClick={toggleMusicModal}>
              <StyledImage
                  src={Music}
                  alt="유튜브"
                  layout="fill"
                  objectFit="cover"
                />
              </YoutubeEmbedButton>
            </SourceTypeChoose>
          )}
    </SourceInput>
  )
}

const SourceInput = styled.div`
  width: 342px;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  background-color: white;
  margin-right: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SourceTypeChoose = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`



const StyleInput = styled.input`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
  color: black;
  background-color: white;
  border: none;
  text-align: center;
`;

const ImageInput = styled(StyleInput)`
  width: 100px;
  height: 100px;
`;


const YoutubeEmbedButton = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  color: white;
`
const StyledImage = styled(Image)`
  border-radius: 20px;
`;