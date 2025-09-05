import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 11.5%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  margin-top: 7%;
  max-width: fit-content;

  h1 {
    color: var(--main);
    margin-bottom: 1rem;
  }

  @media (max-width: 1080px) {
    max-width: 100%;
  }
`;

export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 3.2rem;

  margin-top: 3.2rem;
  padding: 1.6rem 2rem;

  background: #FFF;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0.5rem;

  a {
    max-width: fit-content;
    text-decoration: none;

    button {
      display: flex;
      align-items: center;
      width: 100%;

      background-color: var(--lightblue);
      box-shadow: 0px 3px 6px #00000029;
      border: none;
      border-radius: 0.5rem;

      padding: 1rem 1.4rem;

      color: #FFF;
      font-size: 1.3rem;
      font-weight: 500;

      transition: background-color 0.2s;

      svg {
        font-size: 2rem;
        margin-right: 0.5rem;
      }

      &:hover {
        background-color: ${darken(0.2, '#0E5EDC')};
      }

      @media (max-width: 375px) {
        font-size: 1.2rem;
      }
    }

    @media (max-width: 300px) {
      max-width: 100%;

      button {
        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 1080px) {
    margin-top: 1.4rem;
    margin-bottom: 6rem;

    grid-template-columns: 1fr;
    gap: 2rem;

    a {
      max-width: 100%;
    }
  }

  @media (max-width: 400px) {
    padding: 1.6rem 1rem;
  }
`;

export const BackgroundImg = styled.div`
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: 0;

  background-repeat: no-repeat;
  background-position: -5rem 5rem;
  background-size: 140%;
  width: 44rem;
  height: 40rem;

  @media (max-width: 1080px) {
    display: none;
  }
`;
