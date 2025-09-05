import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0rem 2rem 3rem;
`;

export const Table = styled.table`
  width: 100%;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;

  tr:not(:last-child){
    border-bottom: 2px solid #D9D9D9;
  }
  th,
  td {
    padding: 15px 0;
  }
  th {
    font-size: 1.4rem;
    font-weight: 600;
    color: #002E75;
    border-bottom: 2px solid #D9D9D9;
  }

  td {
    font-size: 1.4rem;
    font-weight: 500;
    color: #000000;
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
    }

    td:before {
      content: attr(data-label);
      position: absolute;
      color: #002E75;
      padding-right: 5px;
      text-align: left;
      font-weight: 600;
      width: 50%;
    }
  }

  @media (max-width: 568px){
    td:before {
      position: relative;
      text-align: left;
    }
    td{
      text-align: left;
      padding: 15px 0;
    }
  }
`;

export const Header = styled.footer`
  display: flex;
  margin: 2.5rem 0 2rem;

  button[type="button"] {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF9700;

    box-shadow: 0px 3px 6px #00000029;
    border: none;
    border-radius: 8px;

    padding: 0.8rem 1.2rem;
    max-width: 12rem;
    width: 100%;

    color: #FFF;
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

    &:hover {
      background-color: ${darken(0.2, '#FF9700')};
    }
  }

  @media (max-width: 680px) {
    flex-direction: column;

    button[type="button"] {
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
