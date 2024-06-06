import styled from "styled-components"

const Layout = styled.div`
  width: 120px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
`

const CharacterLayout = styled.div`
  width: 50%;
  height: 100%;
  background-color: purple;
`

export const UserCard = ({usernickname}:{usernickname:string}) => {
  return(
    <Layout>
      <CharacterLayout>
      </CharacterLayout>
      <CharacterLayout>
        {usernickname}
      </CharacterLayout>
    </Layout>
  )
}