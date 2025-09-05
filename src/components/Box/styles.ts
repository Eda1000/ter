import styled from 'styled-components';

interface Props {
  padding?: string;
  height?: string;
}

export const Container = styled.div<Props>`
  position: relative;
  box-shadow: 0px 6px 10px #00000047;
  border-radius: 1.5rem;
  background: #ffffff;
  width: 100%;
  cursor: pointer;

  > div {
    border-radius: 1.5rem 1.5rem 0 0;
    width: 100%;
    max-height: ${(props) => (props.height ? props.height : '14rem')};
    overflow: hidden;

    img {
      display: table;
      margin: 0 auto;
      width: 100%;
      max-width: fit-content;
      height: fit-content;
      height: 200px;
    }
  }

  section {
    padding: ${({ padding }) => (padding ? padding : '1rem 0.8rem 2rem')};

    h2 {
      font-size: 1.3rem;
      font-weight: bold;
      line-height: 1.5rem;
      margin-bottom: 0;
      color: #002e75;
    }

    p {
      color: #002e75;
      font-size: 0.8rem;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0 0.5rem;
      margin-top: 3.2rem;

      button {
        display: flex;
        justify-content: center;

        background-color: #0e5edc;
        color: #ffffff;
        font-size: 1.5rem;

        border: 0;
        width: 38px;
        height: 38px;
        border-radius: 100%;
      }

      h3 {
        color: var(--blue);
        font-size: 2.1rem;
        margin-bottom: 0;
      }
    }
  }

  div.check {
    display: none;
    position: absolute;
    top: -1.5rem;
    right: -1.5rem;

    background-color: #0e5edc;
    width: 49px;
    height: 49px;
    border-radius: 100%;
  }

  &.selected {
    border: 2px solid #0044ff;

    div.check {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #ffffff;

      z-index: 1;
    }
  }
`;
