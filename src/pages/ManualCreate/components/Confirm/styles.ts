import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 3rem 2rem;

  p {
    font-size: 1.4rem;
    color: #002e75;
    margin-bottom: 0.5rem;
  }
`;

export const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3ad40c;
  margin: 2.5rem 0;
  max-width: 201px;
  max-height: 54px;
  width: 100%;
  height: 100%;
  border: 0;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  color: #ffffff;
  font-size: 1.4rem;
  padding: 0.6rem 0;

  svg {
    margin-right: 0.6rem;
    font-size: 2rem;
  }

  &:hover {
    background-color: ${darken(0.2, '#3AD40C')};
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  padding: 15px 0;
`;

export const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;

  position: relative;

  width: 100%;
  max-width: 470px;
  min-height: 58px;

  margin: 5px 0;
  padding: 10px 20px;

  border-radius: 10px;
  border: 2px solid var(--blue);
  img {
    cursor: pointer;
  }
`;

export const SearchBox = styled.input`
  width: 100%;
  border: unset;

  font-size: 25px;
  color: var(--blue);

  background: transparent;
  &::placeholder {
    color: #888888;
  }
  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 125px;
  min-height: 47px;
  margin: 5px 5px;
  padding: 5px 10px;

  border-radius: 7px;
  border: unset;

  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;

  background: var(--lightblue);
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.7;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4.5rem;
  row-gap: 2.3rem;

  max-width: 100%;
  width: 100%;
  margin-top: 2.5rem;

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
