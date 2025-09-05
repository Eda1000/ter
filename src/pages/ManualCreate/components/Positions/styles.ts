import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 3rem 2rem;

  h1 {
    color: #002e75 !important;
  }
`;

export const InformationTable = styled.div`
  border: 2px solid #d9d9d9;
  margin-bottom: 2rem;

  section {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    color: #002e75;
    padding: 19px 24px;

    & + section {
      border-top: 2px solid #d9d9d9;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;

  tr:not(:last-child) {
    border-bottom: 2px solid #d9d9d9;
  }
  th,
  td {
    padding: 15px 0;
  }
  th {
    font-size: 1.4rem;
    font-weight: 600;
    color: #002e75;
    border-bottom: 2px solid #d9d9d9;
  }

  td {
    font-size: 1.4rem;
    font-weight: 500;
    color: #002e75;
  }

  @media (max-width: 768px) {
    tbody,
    tr,
    td {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      text-align: right;
      margin-bottom: 1rem;
    }

    thead {
      display: none;
    }

    td {
      position: relative;
      max-height: 100px;
    }

    td:before {
      content: attr(data-label);
      position: absolute;
      color: #002e75;
      padding-right: 5px;
      text-align: left;
      font-weight: 600;
      width: 50%;
    }
  }

  img {
    width: 50px;
    height: auto;
    object-fit: cover;
  }

  @media (max-width: 568px) {
    td:before {
      position: relative;
      text-align: left;
    }
    td {
      text-align: left;
      padding: 15px 0;
    }
  }
`;

export const PositionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 200px;

  h2 {
    font-size: 1.6rem;
    color: #002e75;
  }
`;

export const PositionSelect = styled.div`
  margin-top: 2rem;
  padding-left: 1rem;

  h3 {
    font-size: 1.4rem;
    color: #002e75;
  }

  select {
    font-size: 1.4rem;
    padding: 0.4rem 0;
    width: 100%;
    max-width: 711px;

    border-top: 0;
    border-left: 0;
    border-right: 0;
  }

  .ant-select {
    width: 100%;
    max-width: 711px;

    color: var(--blue);

    border: 1px solid var(--blue);
  }

  @media (max-width: 800px) {
    padding: 0;

    select {
      font-size: 1rem;
    }
  }

  @media (max-width: 300px) {
    select {
      font-size: 0.8rem;
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  margin-top: 2.5rem;
  justify-content: flex-end;
  padding: 0 2rem;

  button[type='button'] {
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0px 3px 6px #00000029;
    border: none;
    border-radius: 8px;

    padding: 0.8rem 1.2rem;
    max-width: 12rem;
    width: 100%;
    margin-left: auto;

    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;

    transition: background-color 0.2s;

    svg {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    & + button {
      margin-left: 1.5rem;
    }
  }

  button[type='button']:first-child {
    background-color: #ff9700;

    &:hover {
      background-color: ${darken(0.2, '#FF9700')};
    }
  }

  button[type='button']:last-child {
    display: flex;
    justify-content: space-around;

    min-width: 180px;

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

    &:disabled {
      opacity: 0.5;
    }

    &:hover {
      background-color: ${darken(0.2, '#3AD40C')};
    }
  }

  @media (max-width: 680px) {
    flex-direction: column;

    button[type='button'] {
      width: 100%;
      min-width: 100%;
      justify-content: center;

      margin-left: 0;

      & + button {
        margin-left: 0;
        margin-top: 1.5rem;
      }
    }
  }
`;
