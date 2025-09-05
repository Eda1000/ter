import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.125);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
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

export const Title = styled.h1``;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 190px;
  max-width: 190px;
  height: 40px;

  margin: 0 auto;

  overflow: hidden;

  color: var(--lightblue);
  font-size: 0.8rem;
  font-weight: 700;
  text-overflow: ellipsis;

  border: 0;
  border-radius: 8px;

  cursor: pointer;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ConfirmButton = styled(Button)`
  background: #ff0720;
  color: #fff;
`;
