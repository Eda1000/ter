import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.125);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.form`
  position: relative;

  background: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

  width: 100%;
  max-width: 32rem;

  padding: 3rem;
  border-radius: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  text-align: center;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;

  position: absolute;

  top: 0.125rem;
  right: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #888888;
  font-size: 1.875rem;
  font-weight: bold;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 190px;
  max-width: 190px;
  height: 40px;
  background-color: var(--orange);

  margin: 0 auto;

  overflow: hidden;

  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  text-overflow: ellipsis;

  border: 0;
  border-radius: 8px;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.9;
  }
`;

export const Input = styled.input`
  margin-top: 2rem;

  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 80%;
`;
