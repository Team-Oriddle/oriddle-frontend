import Image from "next/image";
import styled from "styled-components";
import { Header } from "../header/Header";

const MainBackground = ({ overlayText = "테스트 페이지", children }) => {
  return (
    <Container>
      <Header></Header>
      <StyledImage
        src='/main/main_t_sand.png'
        alt='Next.js'
        width={2199}
        height={205}
        style={{ zIndex: 1, transform: "translateY(10vh)" }}
        priority
      />
      <OverlayWrapper>
        <StyledImage
          src='/main/main_o_sand.png'
          alt='Next.js'
          width={2199}
          height={602}
          style={{ zIndex: 2, transform: "translateY(5vh)" }}
          priority
        />
        <OverlayText
          style={{
            zIndex: 3,
            fontSize: "4em",
            color: "white",
            transform: "translateY(15vh)",}}
        >{overlayText}</OverlayText>
      </OverlayWrapper>
      <StyledCharacter
        src='/main/main_spinks_d.png'
        alt='Next.js'
        width={565}
        height={537}
        style={{ zIndex: 3, transform: "translateY(10vh)" }}
        priority
      />
      <StyledImage
        src='/main/main_sand.png'
        alt='Next.js'
        width={1399}
        height={300}
        style={{ zIndex: 4, transform: "translateY(30vh)" }}
        priority
      />
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default MainBackground;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 70vh;
  background: linear-gradient(to bottom, transparent 20vh, #fee1b2 20vh);
`;

const StyledImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
`;

const StyledCharacter = styled(Image)`
  position: absolute;
  height: auto;
  top: 0;
  /* PC일 때 */
  @media (min-width: 1024px) {
    width: 15%;
    left: 70%;
  }
  /* 태블릿일 때 */
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20%;
    left: 70%;
  }
  /* 모바일일 때 */
  @media (max-width: 767px) {
    width: 30%;
    left: 60%;
  }
`;

const OverlayWrapper = styled.div`
  position: relative;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 0;
  color: black;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  z-index: 5;
  transform: translateY(24vh);
  /* PC일 때 */
  @media (min-width: 1024px) {
    font-size: 3rem;
    left: 15%;
  }
  /* 태블릿일 때 */
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 2rem;
    left: 10%;
  }
  /* 모바일일 때 */
  @media (max-width: 767px) {
    font-size: 1.2rem;
    left: 10%;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 20%;
  width: 100%;
`;
