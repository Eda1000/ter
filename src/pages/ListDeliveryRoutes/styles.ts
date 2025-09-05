import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 0 11.5%;
  padding-bottom: 2em;
`;

export const Content = styled.div`
  margin: 4em 0;
  padding: 0 10px;
`;

export const TitleContent = styled.div`
  padding: 3em 11.5% 1.5em;
  width: 100%;
  background: #fff;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  position: relative;
  width: 100%;
  max-width: 835px;
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

export const NewLoadingButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 125px;
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
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 410px;
  min-height: 70px;
  padding: 5px 0px;
  margin: 0 5px;
  font-size: 1.1rem;
  color: #002e75;
  @media (min-width: 1080px) {
    border-left: 1px solid #00000029;
    padding-left: 45px;
  }
`;
export const SelectLabel = styled(Label)`
  .ant-select {
    font-family: 'Ubuntu', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    padding: 2px 0;
    border-bottom: 1px solid #00000029;
  }
  .ant-select-selector {
    margin: 0 !important;
    padding: 0 !important;
  }

  .ant-select-arrow {
    right: 0;
    color: #002e75;
    font-size: 1rem;
    width: 30px;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  border-radius: 19px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);

  background-color: #fff;

  /* @media(min-width: 568px){
    padding: 0 30px;    
    } */
`;
export const Table = styled.table`
  width: 100%;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  p {
    margin: 0;
    line-height: 0.9;
  }

  th:first-child {
    border-radius: 19px 0 0 0;
  }

  th:last-child {
    border-radius: 0 19px 0 0;
  }

  th {
    padding: 30px 30px 20px;
  }

  td {
    padding: 10px 30px;
  }
  th {
    font-size: 1.2rem;
    font-weight: 700;
    color: #002e75;
    background: #fff;
  }
  td {
    font-size: 1rem;
    color: #6c6c6c;
  }
  td:last-child {
    background: #fff;
  }
  tr:nth-child(odd) {
    background: transparent;
  }
  tr:nth-child(even) {
    td {
      background: #fff;
    }
  }

  tr {
    &:hover {
      background: #e2e2e2 !important;

      td {
        background: #e2e2e2;
      }

      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
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

    tr:last-child {
      td:last-child {
        border-radius: 0 0 19px 19px;
      }
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

export const StatusLoaded = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 70%;
  min-height: 70px;
  padding: 2px 2px;
  margin: auto;

  border-radius: 10px;
  font-size: 14px;
  color: #ff7d00;
  background: #f9ffbb;
  @media (min-width: 568px) {
    margin-left: auto;
  }
`;
export const StatusDelivered = styled(StatusLoaded)`
  color: #047d10;
  background: #e6ffe3;
`;
