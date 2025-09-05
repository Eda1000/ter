import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const BoxesSection = styled.div`
  min-width: calc(60vw - 15px);
  width: calc(60vw - 15px);

  margin-top: 3.1rem;
  position: relative;
`;

export const BoxContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4rem;
  justify-items: center;
  padding: 1.5rem 1.5rem;
  border-radius: 16px;

  margin-top: 3.4rem;
  background-color: #f0f4fc;

  width: 100%;

  color: var(--orange);
  font-size: 1.2rem;
  font-weight: 500;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const HeaderBoxes = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Close = styled.div`
  &.close {
    color: #888888;
    font-size: 30px;
    font-weight: bold;

    margin: -20px 0 -20px auto;

    cursor: pointer;
  }
`;
