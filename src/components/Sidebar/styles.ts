import styled from 'styled-components';

export const Container = styled.header`
  position: fixed;
  top: 50%;

  max-height: 32rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.8rem 1rem;

  border-radius: 0 1rem 1rem 0;

  background-color: var(--main);
  box-shadow: 0px 3px 6px #00000029;

  transform: translateY(-50%);

  z-index: 2;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 6rem;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      color: #ffffff;
      font-size: 1rem;
      font-weight: 400;
      text-decoration: none;

      img {
        margin-bottom: 0.5rem;
      }
    }
  }

  @media (max-width: 1080px) {
    position: fixed;
    top: calc(100% - 32px);

    max-height: min-content;
    width: 100%;

    flex-direction: row;
    padding: 1rem 1.8rem;

    border-radius: 0;

    a {
      height: 100%;

      img {
        margin-top: auto;
        margin-bottom: auto !important;
      }

      div {
        display: none;
      }
    }
  }
`;
