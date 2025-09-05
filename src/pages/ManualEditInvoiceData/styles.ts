import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 11.5%;
  width: 100%;

  display: flex;
  flex-direction: column;

  @media (max-width: 1080px) {
    padding: 0 9%;

    padding-bottom: 8rem;
  }

  @media (max-width: 450px) {
    padding: 0 3.5%;
  }
`;

export const Content = styled.div`
  margin-top: 7%;
  min-width: 100%;
  margin-bottom: 5rem;

  h1 {
    color: var(--main);
    margin-bottom: 1rem;
  }
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3.2rem;
  padding: 1.6rem 0rem;

  background: #FFF;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 1.5rem;

  @media (max-width: 450px) {
    margin-top: 1.5rem;
  }
`;
