import Image from "next/image";
import styled from "styled-components";

const MainBackground = ({ overlayText = "테스트 페이지" }) => {
  return (
    <Container>
      <StyledImage
        src='/main/main_t_sand.png'
        alt='Next.js'
        width={2199}
        height={205}
        style={{ zIndex: 1 }}
        priority
      />
      <OverlayWrapper>
        <StyledImage
          src='/main/main_o_sand.png'
          alt='Next.js'
          width={2199}
          height={602}
          style={{ zIndex: 2 }}
          priority
        />
        <OverlayText>{overlayText}</OverlayText>
      </OverlayWrapper>
      <StyledCharacter
        src='/main/main_spinks_d.png'
        alt='Next.js'
        width={565}
        height={537}
        style={{ zIndex: 3 }}
        priority
      />
      <StyledImage
        src='/main/main_sand.png'
        alt='Next.js'
        width={2199}
        height={1013}
        style={{ zIndex: 4, transform: "translateY(15%)" }}
        priority
      />
    </Container>
  );
};

export default MainBackground;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, transparent 20vh, #fee1b2 20vh);
  /* PC일 때 */
  @media (min-width: 1024px) {
    margin-top: 20%;
  }
  /* 태블릿일 때 */
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-top: 15%;
  }
  /* 모바일일 때 */
  @media (max-width: 767px) {
    margin-top: 15%;
  }
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
    transform: translateY(-15%);
  }
  /* 태블릿일 때 */
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20%;
    left: 70%;
    transform: translateY(-35%);
  }
  /* 모바일일 때 */
  @media (max-width: 767px) {
    width: 30%;
    left: 60%;
    transform: translateY(-45%);
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
  /* PC일 때 */
  @media (min-width: 1024px) {
    font-size: 3rem;
    left: 15%;
    transform: translateY(70%);
  }
  /* 태블릿일 때 */
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 2rem;
    left: 10%;
    transform: translateY(90%);
  }
  /* 모바일일 때 */
  @media (max-width: 767px) {
    font-size: 1.2rem;
    left: 10%;
    transform: translateY(45%);
  }
`;
