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
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  max-width: 375px;
  min-height: 50px;

  padding: 5px 0px;

  font-size: 14px;
  color: #002e75;

  .ant-picker {
    padding: 15px 0;

    border: 0;
    border-bottom: 1px solid #888888;

    &:focus {
      outline: none;
      border-bottom: 1px solid var(--lightblue);
    }
  }

  .ant-select {
    font-family: 'Ubuntu', sans-serif;
    font-size: 18px;
    font-weight: 400;
    padding: 9px 0;
    border-bottom: 1px solid #888888;
  }
  .ant-select-selector {
    margin: 0 !important;
    padding: 0 !important;
  }

  .ant-select-arrow {
    right: 0;
    color: #002e75;
    font-size: 1rem;
    width: 30px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  margin-top: 2.5rem;
  justify-content: flex-end;
  padding: 0 2rem;
`;

export const SaveButton = styled.button`
  border: none;

  margin-left: auto;

  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0.5rem;
  padding: 0.75rem 1.25rem;
  max-width: 12rem;
  min-width: 12rem;
  background-color: #3ad40c;

  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;

  color: #fff;
  font-size: 1.25rem;
  font-weight: 500;

  svg {
    font-size: 1.5rem;
  }

  transition: background-color 0.2s;

  &:hover {
    background-color: ${darken(0.2, '#3AD40C')};
  }

  &:disabled {
    opacity: 0.5;
  }
`;
