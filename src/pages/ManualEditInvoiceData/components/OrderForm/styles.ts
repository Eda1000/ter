import styled from 'styled-components';
import { darken } from 'polished';

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4.5rem;
  row-gap: 2.3rem;

  max-width: 100%;
  width: 100%;
  margin-top: 2.5rem;

  padding: 0 2rem;

  div {
    display: flex;
    flex-direction: column;

    max-width: 100%;
    width: 100%;

    label {
      color: var(--blue);
      font-size: 1.3rem;
    }

    input {
      font-size: 1.3rem;
      padding: 0.5rem;

      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid #888888;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    @media (max-width: 280px) {
      max-width: 210px;
    }
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const Footer = styled.footer`
  display: flex;
  margin-top: 2.5rem;
  justify-content: flex-end;
  padding: 0 2rem;

  button[type='button'] {
    display: flex;
    align-items: center;

    background-color: var(--lightblue);
    box-shadow: 0px 3px 6px #00000029;
    border: none;
    border-radius: 8px;

    padding: 0.8rem 1.2rem;
    max-width: 12rem;
    margin-left: auto;

    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;

    transition: background-color 0.2s;

    svg {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    &:hover {
      background-color: ${darken(0.2, '#0E5EDC')};
    }

    & + button {
      margin-left: 1.5rem;
    }
  }

  button[type='button']:first-child {
    background-color: #ff9700;

    &:hover {
      background-color: ${darken(0.2, '#FF9700')};
    }
  }

  button[type='button']:last-child {
    background-color: #3ad40c;
    display: flex;
    justify-content: space-around;
    gap: 10px;

    min-width: 180px;

    &:hover {
      background-color: ${darken(0.2, '#3AD40C')};
    }

    &:disabled {
      opacity: 0.5;
    }

    .anticon {
      svg {
        font-size: 25px;
        margin-right: unset;
      }
    }
  }

  @media (max-width: 680px) {
    flex-direction: column;

    button[type='button'] {
      width: 100%;
      min-width: 100%;
      justify-content: center;

      margin-left: 0;

      & + button {
        margin-left: 0;
        margin-top: 1.5rem;
      }
    }
  }
`;
