import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
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
  max-width: 455px;
  margin: 2em 0;
  @media (max-width: 568px) {
    justify-content: center;
  }
`;
export const PageTitle = styled.h1`
  margin: 5px 0;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 700;
  color: var(--main);
`;

export const NewInvoiceButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 170px;
  min-height: 47px;
  margin: 5px 5px;
  padding: 5px 10px;
  border-radius: 7px;
  border: unset;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  background: var(--lightblue);
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  border-radius: 19px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  @media (min-width: 568px) {
    padding: 0 30px;
  }
`;

export const Table = styled.table`
  width: 100%;
  max-width: 960px;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;
  tr:not(:last-child) {
    border-bottom: 2px solid #d4dbe7;
  }
  th,
  td {
    padding: 15px;
  }
  th {
    font-size: 1.1rem;
    font-weight: 500;
    color: #002e75;
    border-bottom: 2px solid #d4dbe7;
  }
  td {
    font-size: 1.1rem;
    color: #000;
  }
  p {
    margin-bottom: 0;
  }

  @media (max-width: 992px) {
    tbody,
    tr,
    td {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      text-align: right;
    }
    thead {
      display: none;
    }
    td {
      position: relative;
    }
    td:before {
      content: attr(data-label);
      color: #002e75;
      padding-right: 5px;
      text-align: left;
      font-weight: 600;
      width: 50%;
    }
  }

  @media (max-width: 568px) {
    td:before {
      position: relative;
      text-align: left;
    }
    td {
      text-align: left;
      padding: 15px 15px;
    }
  }
`;
