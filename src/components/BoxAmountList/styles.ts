import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 100%;

  margin-top: 3.1rem;
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8rem;
  padding: 0 2rem;

  width: 100%;
  max-width: 100%;

  div {
  }
`;

export const SearchBar = styled.form`
  position: relative;

  width: 100%;
  max-width: 28rem;

  display: flex;
  align-items: center;

  border: 2px solid var(--blue);
  border-radius: 1.8rem;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;

  width: 100%;
  max-height: 100%;

  font-size: 1.5rem;

  padding: 0.8rem 3.5rem 0.8rem 2rem;
`;

export const SearchButton = styled.button`
  border: none;
  background: transparent;

  padding: 0.75rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.25rem;
    color: var(--blue);
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 20rem;
`;

export const SelectLabel = styled.label`
  color: var(--blue);
  font-size: 1.2rem;

  margin-bottom: 0.5rem;
`;

export const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.4rem 0;

  border-top: 0;
  border-left: 0;
  border-right: 0;
`;

export const BoxContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.4rem;
  justify-items: center;
  padding: 2.5rem 1.5rem;

  margin-top: 3.4rem;
  background-color: #f0f4fc;

  width: 100%;
`;

export const Footer = styled.footer`
  position: fixed;
  z-index: 999;
  bottom: 2rem;
  left: 10.5%;
  right: 10.5%;
  padding: 0 1.5rem;

  background-color: #ffffff;
  box-shadow: 0px 3px 30px #0000005e;
  max-width: 100%;

  border-radius: 8px;

  section {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    padding: 1.25rem 0;
    margin: 0 auto;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      h2 {
        color: #2cbc00;
        font-size: 1.5rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin-bottom: 0;

        svg {
          font-size: 2.3rem;
          margin-right: 0.5rem;
        }
      }

      p {
        color: #737373;
        font-size: 1.5rem;
        margin-bottom: 0;
      }

      @media (max-width: 400px) {
        h2 {
          font-size: 1.2rem;

          svg {
            font-size: 1.6rem;
          }
        }

        p {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 300px) {
        h2 {
          font-size: 0.8rem;

          svg {
            font-size: 1.1rem;
          }
        }

        p {
          font-size: 0.8rem;
        }
      }
    }

    div:last-child {
      button[type='button'] {
        display: flex;
        align-items: center;
        gap: 1rem;

        background-color: #ff9700;
        box-shadow: 0px 3px 6px #00000029;
        border: none;
        border-radius: 8px;

        padding: 0.8rem 1.5rem;
        max-width: 15rem;
        margin-left: auto;

        color: #fff;
        font-size: 1.2rem;
        font-weight: 500;

        transition: background-color 0.2s;

        p {
          color: #fff;
        }

        svg {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }

        &:hover {
          background-color: ${darken(0.2, '#FF9700')};
        }

        & + button {
          margin-left: 1.5rem;
        }
      }

      button[type='button']:first-child {
        background-color: #ffffff;
        box-shadow: 0px 3px 6px #0000006b;
        padding: 0.8rem;

        svg {
          color: var(--blue);
          font-size: 1.8rem;
          margin-right: 0;
        }

        &:hover {
          background-color: ${darken(0.2, '#FFFFFF')};
        }
      }

      button[type='button']:last-child {
        display: flex;
        justify-content: space-around;

        min-width: 210px;

        padding: 0.8rem 1.25rem;

        background-color: #3ad40c;

        svg {
          color: #fff;
        }

        .anticon {
          svg {
            font-size: 25px;
            margin-left: unset;
          }
        }

        &:hover {
          background-color: ${darken(0.2, '#3AD40C')};
        }
      }
    }
  }

  @media (max-width: 1080px) {
    bottom: 6rem;
    flex-direction: column;
    left: 2%;
    right: 2%;

    section {
      flex-direction: column;
    }

    div:last-child {
      margin-top: 1rem;

      button {
        padding: 1rem;
        font-size: 1.3rem;
        margin-left: 0.5rem;
      }
    }
  }

  @media (max-width: 450px) {
    bottom: 6rem;
    flex-direction: column;

    section {
      flex-direction: column;
    }

    div:last-child {
      button {
        padding: 1rem 0.5rem;
        font-size: 1rem;
        margin-left: 0.5rem;
        padding: 0.8rem 1.2rem !important;
        max-height: 43px;

        p {
          display: none;
        }

        svg {
          margin-right: 0 !important;
        }
      }
    }
  }
`;

export const ShowMore = styled.p`
  background: var(--main);
  color: #fff;
  margin: 20px auto;
  text-align: center;
  cursor: pointer;
  border: 5px solid var(--main);
  border-radius: 10px;
  width: 200px;

  &:hover {
    background: #f7b04a;
    border: 5px solid #f7b04a;
  }
`;

export const PaginationWrapper = styled.div`
  padding-top: 2rem;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
