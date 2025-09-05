import styled from 'styled-components';

export const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  aside {
    display: flex;
    align-items: center;
    max-width: 100%;
    padding: 4rem;

    z-index: 1;

    background-color: var(--blue);
    border-radius: 0px 77px 77px 0px;

    >div {
      display: flex;
      flex-direction: column;

      max-width: 620px;
      width: 100%;
      margin: 0 auto;

      header {
        max-width: 12rem;
        margin-bottom: 1.2rem;

        img {
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 1080px) {
    grid-template-columns: 1fr 0fr;

    aside {
      border-radius: 0;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const Label = styled.label`
  font-size: 1.5rem;
  line-height: 3.4rem;

  color: #FFFFFF;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  input {
    width: 100%;
    height: 4rem;
    padding: 1rem;

    border: 0;
    border-radius: 4px;
    box-shadow: 0px 3px 6px #00000029;

    font-size: 1.2rem;

    &::placeholder {
      font-size: 1.1rem;
      color: #969291;
    }
  }
`;

export const SideTruck = styled.section`
    background-position: 60% -130%;
    background-repeat: no-repeat;
    background-size: 1600px 1000px;

    display: flex;
    justify-content: end;

    img {
      z-index: 2;
      width: 85%;

      margin: auto 0 1.3rem -4rem;
    }
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  height: 4rem;
  padding: 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: var(--orange);
  color: #FFFFFF;
  font-weight: 500;
  font-size: 1.6rem;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  & + div {
    margin-top: 1.2rem;
  }
`;
