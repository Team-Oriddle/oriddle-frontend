import styled from "styled-components"

export const ChooseQuizEditPageNumber = ({selectedPage, onNextPage, onPreviousPage}) => {
  return (
    <Layout>
      <div onClick={onPreviousPage} >
        &lt;
      </div>
      <div>
        {selectedPage}/3
      </div>
      <div onClick={onNextPage}>
        &gt;
      </div>
    </Layout>
  )
}

const Layout = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0px;
`
