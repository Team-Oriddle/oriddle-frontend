import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body { 
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI;
    font-size : 16px;
    color: rgb(58, 58, 58);
  }
  ul, ol {
    list-style: none;
  }
  button {
    all: unset;
    cursor: pointer;
  }
`;