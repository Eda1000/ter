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
  max-width: 630px;
  margin: 2em 0;
  @media (max-width: 759px) {
    justify-content: center;
  }
`;

export const PageTitle = styled.h1`
  margin: 5px 5px 0 0;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 700;
  color: var(--main);
`;

export const ShowAllIncidentsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 250px;
  min-height: 47px;
  margin: 5px 5px;
  padding: 5px 10px;
  border: 0;
  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  color: #fff !important;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  background: var(--lightblue);
  cursor: pointer;

  div {
    padding-right: 15px;
  }

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
  }
  @media (max-width: 759px) {
    max-width: 205px !important;
    margin: 5px auto;
  }
`;

export const Informations = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 2em 0px;
  @media (max-width: 759px) {
    justify-content: center;
  }
`;

export const InfoGroup = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 375px;
  min-height: 130px;
  padding: 5px 0px;
  font-size: 25px;
  color: #002e75;
`;
export const IncidentLabel = styled(Label)`
  max-width: 590px;
`;

export const DeliveryRadioLabel = styled(Label)`
  max-width: 630px;
`;

export const RadioWrapper = styled.div`
  .ant-radio-group {
    display: flex;
    flex-direction: column;

    .ant-radio-inner {
      border: 3px solid #707070 !important;
    }
    .ant-radio-inner::after {
      top: 1px;
      left: 1px;
      background-color: #0044ff !important;
    }
    .ant-radio-checked .ant-radio-inner {
      border-color: #707070 !important;
    }
    .ant-radio-checked .ant-radio-inner:after {
      transform: scale(2);
    }
  }

  span {
    font-size: 1.1rem;
    color: #4f4f4f;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-height: 30px;
  padding: 5px 0;
  border: 0;
  font-size: 1.5rem;
  border-bottom: 1px solid #888888;
  color: #4f4f4f;
  transition: all 0.5s;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--lightblue);
  }
`;

export const ButtonsWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 790px;
  margin-top: 5em;
`;
export const MainButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
  max-width: 630px;
  @media (max-width: 759px) {
    margin: auto;
    justify-content: center;
  }
`;
export const SaveButton = styled(ShowAllIncidentsButton)`
  justify-content: space-around;
  width: 150px;
  padding: 0 30px;
  background: var(--green);
  margin: 10px;
  @media (min-width: 759px) {
    margin-right: 30px;
  }
`;

export const BackButton = styled(ShowAllIncidentsButton)`
  width: 150px;
  margin: 10px;
  background: var(--main);
`;
