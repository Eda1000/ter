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
  max-width: 585px;
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

export const ShowAllTrucksButton = styled.div`
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
  color: #fff !important;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  background: var(--lightblue);
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: 1039px) {
    &.info-group__register-function {
      margin-top: 50px;
    }
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
  max-width: 390px;

  &.informations__info-group-second {
    max-height: 300px;
  }
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
export const SelectLabel = styled(Label)`
  .ant-select {
    font-family: 'Ubuntu', sans-serif;
    font-size: 25px;
    font-weight: 400;
    padding: 9px 0;
    border-bottom: 1px solid #888888;
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

export const RadioWrapper = styled.div`
  .ant-radio-group {
    display: flex;
    flex-direction: column;

    .ant-radio-inner {
      border: 3px solid #707070 !important;
    }
    /* .ant-radio-checked::after {
        } */
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
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
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  @media (max-width: 759px) {
    margin: auto;
  }
`;
export const SaveButton = styled(ShowAllTrucksButton)`
  width: 205px;
  justify-content: space-around;
  background: var(--green);
`;

export const BackButton = styled(ShowAllTrucksButton)`
  max-width: 155px;
  background: var(--main);
`;

export const DeleteButton = styled(ShowAllTrucksButton)`
  max-width: 155px;
  background: #ff0720;
`;
