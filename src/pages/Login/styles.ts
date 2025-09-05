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

    @media (max-height: 480px) {
      padding: 1rem;
    }

    > div {
      display: flex;
      flex-direction: column;

      max-width: 620px;
      width: 100%;
      margin: 0 auto;

      header {
        max-width: 18rem;
        margin-bottom: 2.1rem;

        img {
          width: 100%;
        }
      }

      @media (max-height: 480px) {
        header {
          max-width: 12rem;
          margin: 0 auto 1.2rem;

          img {
            width: 100%;
          }
        }
      }

      footer {
        margin-top: 2.4rem;

        text-align: center;
        color: #fff;
        font-size: 1.5rem;

        a {
          margin-left: 0.5rem;
          color: #fff;
          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.8);
          }
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

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    label {
      font-size: 1.8rem;
      line-height: 3.4rem;

      color: #ffffff;
    }

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

    button {
      margin-top: 1rem;
      height: 4rem;
      padding: 1rem;
      border: 0;
      border-radius: 0.5rem;

      background-color: var(--orange);
      color: #ffffff;
      font-weight: 500;
      font-size: 1.6rem;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }

    a {
      color: #ffffff;
      font-size: 1.2rem;
      text-decoration: none;

      margin-top: 1rem;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }

    &:last-child {
      text-align: right;
    }

    & + div {
      margin-top: 1.8rem;
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

export const SaveLogin = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  label,
  a {
    color: #ffffff;
    font-size: 1.2rem;
    cursor: pointer;

    input[type='checkbox'] {
      border: 0 none;
      outline: 0;
      margin-right: 0.4rem;
    }
  }

  @media (max-width: 280px) {
    flex-direction: column;
    align-items: center;

    span {
      margin-bottom: 10px;
    }
  }
`;
