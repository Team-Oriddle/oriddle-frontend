import styled from "styled-components"

const Layout = styled.div`
  padding-top: 30px;
  margin-bottom: 30px;
  grid-column: 1/13;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: black
`

const Title = styled.div`
  font-size: 40px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Buttons = styled.div`
  width: 220px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Button = styled.div`
  width: 98px;
  height: 70px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Header = () =>{

  return(
    <Layout>
      <Title>ORIDDLE</Title>
      <Buttons>
        <Button>
          MY PAGE
        </Button>
        <Button>
          LOGIN
        </Button>
      </Buttons>
    </Layout>
  )
}