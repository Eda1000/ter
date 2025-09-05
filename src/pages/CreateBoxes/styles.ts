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
`;

export const PageTitle = styled.h1`
  margin: 5px 0;
  font-size: 29px;
  font-weight: 700;
  color: var(--main);
`;

export const AddImageContainer = styled.div`
  background: #e1e6ea;
  box-shadow: 0px 6px 10px #00000047;
  border-radius: 23px;
  max-width: 260px;
  max-height: 286px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 23px;
  }

  @media (max-width: 850px) {
    max-width: 100%;
  }
`;

export const AddImageIcon = styled.img`
  position: absolute;
  bottom: -80px;
  right: -30px;
  max-width: 80px !important;
`;

export const FileInput = styled.input`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
`;

export const BasicButton = styled.div`
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

  @media (max-width: 759px) {
    max-width: 205px !important;
  }
`;

export const Informations = styled.section`
  display: flex;
  width: 100%;
  margin: 2em 0px;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export const InfoGroup = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 390px;

  @media (max-width: 850px) {
    max-width: 100%;
  }
`;

export const InputGroup = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  div {
    display: flex;

    label + label {
      margin-left: 1.4rem;
    }

    @media (max-width: 1450px) {
      flex-direction: column;
      min-width: 100%;

      label {
        max-width: 100%;

        & + label {
          margin-left: 0;
        }
      }
    }
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
  justify-content: flex-end;
`;

export const MainButtons = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
`;
export const SaveButton = styled(BasicButton)`
  max-width: 170px;
  justify-content: space-around;
  background: var(--green);
`;

export const BackButton = styled(BasicButton)`
  max-width: 155px;
  background: var(--main);
`;
