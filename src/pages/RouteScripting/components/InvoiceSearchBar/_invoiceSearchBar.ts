import styled from 'styled-components';

export const SearchBar = styled.form`
  position: absolute;
  z-index: 9;

  top: 7.5rem;
  left: 5vw;

  width: 100%;
  max-width: 320px;

  background: #ffffff;

  display: flex;
  align-items: center;

  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  border: 2px solid transparent;

  &:focus-within {
    border-color: #0e5edc;
  }
`;

export const SearchInput = styled.input`
  width: 90%;

  min-width: 0px;

  border: none;
  outline: none;

  background: transparent;

  font-size: 1rem;

  padding: 0 1rem;
`;

export const SearchButton = styled.button`
  border: none;
  background: transparent;

  width: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;

  justify-content: center;
  color: #0e5edc;
  font-size: 1.5rem;
  background: #ffffff;

  cursor: pointer;

  border-radius: 8px;
`;
