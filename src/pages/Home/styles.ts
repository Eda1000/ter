import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 768px;

  margin: 0 auto;

  @media (min-width: 1100px) {
    max-width: 950px;
  }

  @media (max-width: 1080px) {
    background-size: 0;
  }
`;

export const Content = styled.div`
  margin-top: 7%;

  padding-bottom: 3em;

  h1 {
    color: var(--main);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.3rem;
    color: var(--blue);
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 3.2rem;
  padding: 1.6rem 2rem;

  background: #fff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 1.5rem;

  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.2rem;

    margin-bottom: 1.8rem;

    div {
      display: flex;
      flex-direction: column;

      label {
        color: var(--blue);
        font-size: 1.1rem;
        font-weight: 500;
      }

      input {
        border: none;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 0.5rem;

        height: 3.4rem;
        margin-top: 1rem;
        padding: 0 1rem;

        font-size: 1rem;

        &::placeholder {
          color: #969291;
        }
      }

      div {
        display: flex;
        justify-content: flex-end;
        height: 3rem;

        img {
          width: 100%;
          margin-bottom: 1rem;
        }

        @media (max-width: 1080px) {
          display: none;
        }
      }

      @media (max-width: 320px) {
        max-width: 190px;

        input::placeholder {
          font-size: 12px;
        }
      }

      @media (max-width: 300px) {
        max-width: 165px;
      }
    }

    @media (max-width: 1080px) {
      grid-template-columns: 1fr;
      gap: 2rem;

      label {
        font-size: 1rem;
      }
    }
  }

  button {
    background-color: var(--lightblue);
    box-shadow: 0px 3px 6px #00000029;
    border: none;
    border-radius: 8px;

    padding: 1rem 1.4rem;
    max-width: 8rem;
    margin-left: auto;

    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;

    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.2, '#0E5EDC')};
    }
  }

  @media (max-width: 1080px) {
    margin-top: 1.4rem;
    margin-bottom: 6rem;
  }
`;
