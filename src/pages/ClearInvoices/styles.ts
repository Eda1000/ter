import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 86vh;
  padding: 0 11.5%;
  background: #fff;
  padding-bottom: 2em;
`;

export const Content = styled.div`
  max-width: 1300px;
  margin: 4em 0;
  padding: 0 10px;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 585px;
  margin: 2em 0;
`;

export const PageTitle = styled.h1`
  margin: 5px 0;
  font-size: 29px;
  font-weight: 700;
  color: var(--main);
`;

export const Button = styled.button`
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 250px;
  min-height: 47px;
  margin: 5px 5px;
  padding: 5px 10px;
  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  background: #ff0720;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 759px) {
    max-width: 205px !important;
    margin: 5px auto;
  }
`;
