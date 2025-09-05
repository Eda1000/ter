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

export const FormWrapper = styled.form`
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
  max-width: 675px;
  margin: 2em 0;
  @media (max-width: 768px) {
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

export const ShowAllDeliveryReceiptsButton = styled.button`
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
  @media (max-width: 768px) {
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
  min-height: 330px;
  margin: 2em 0px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 390px;
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

export const SendFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
  min-height: 110px;
  justify-content: space-between;
  margin: 5px 0px;
  @media (max-width: 768px) {
    margin: 5px auto;
    align-items: center;
  }
`;

export const FileInstruction = styled.p`
  font-size: 25px;
  color: #002e75;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const SendFileButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 275px;
  min-height: 50px;
  padding: 3px 25px;
  border-radius: 7px;
  font-family: 'Ubuntu', sans-serif !important;
  font-size: 1.1rem;
  color: #fff;
  background: var(--lightblue);
  cursor: pointer;
  input {
    display: none;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export const FileName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 275px;
  min-height: 30px;
  margin-top: 15px;
  padding: 3px 3px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: var(--blue400);
  background: #cce0ff;
`;

export const MainButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-end;
  width: 100%;
  max-width: 350px;
  margin-top: 30px !important;
  @media (max-width: 768px) {
    justify-content: center;
    margin: auto;
  }
`;

export const SaveButton = styled(ShowAllDeliveryReceiptsButton)`
  width: 155px;
  height: 45px;
  justify-content: space-around;
  padding: 0 30px;
  background: var(--green);
`;

export const BackButton = styled(ShowAllDeliveryReceiptsButton)`
  width: 155px;
  height: 45px;
  background: var(--main);
`;
