import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

export const GlobalStyle = createGlobalStyle`
  :root {
    --main: #FF9700;

    --orange: #F6A432;
    --blue: #0440A0;
    --lightblue: #0E5EDC;
    --green: #3AD40C;

    --background: #E8EBF3;
    --gray300: #B3B3B3;
    --blue400: #002E75;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button, label {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
  }

  h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @keyframes slide_down {
    0% {
      display: none;
      max-height: 0;
    }
    10% {
      display: block;
    }
    100% {
      max-height: 9999px;
    }
  }

  @keyframes entering{
    from{
      opacity: 0;
    }to{
      opacity: 1;
    }
  }

  
`;
