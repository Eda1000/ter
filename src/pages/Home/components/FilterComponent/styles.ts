import styled from 'styled-components';
import { Link } from 'react-router-dom';

import clipboard_icon from '../../../../assets/general/clipboard_icon.svg';

import airplane_icon from '../../../../assets/general/airplane_icon.svg';
import add_icon from '../../../../assets/general/add_icon.svg';
import light_download from '../../../../assets/general/light_download.svg';
import chevron_down from '../../../../assets/general/chevron_down.svg';

import { ReactComponent as DownloadIconRaw } from '../../../../assets/general/light_download.svg';

interface External {
  renderAs?: any;
  to?: any;
}

export const Filter = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 0;

  background: #fff;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgb(0 0 0/16%);
`;

export const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;

  width: 100%;

  padding: 5px 2rem;
`;

export const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  color: var(--blue);
  font-size: 20px;
  font-weight: 500;
  text-align: center;

  &:before {
    content: '';
    position: relative;

    width: 43px;
    height: 43px;

    background: no-repeat center;
    background-size: contain;
    background-image: url(${clipboard_icon});
  }

  /* @media (max-width: 1100px) {
    width: 100%;
  } */
`;

export const FirstButtonsGroup = styled.div`
  display: flex;
  gap: 15px;

  width: 100%;
  max-width: 340px;
`;

export const SecondButtonsGroup = styled.div`
  display: flex;

  width: 100%;
  max-width: 30.7rem;
`;

const Button = styled(Link)<External>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  height: 50px;

  color: #fff;
  font-size: 16px;
  font-weight: 700;

  border: 0;
  border-radius: 8px;

  cursor: pointer;
  background-color: var(--blue);
  transition: all 0.2s;

  &:before {
    content: '';
    position: relative;

    width: 18px;
    height: 18px;

    background: no-repeat center;
    background-size: contain;
  }

  &:hover {
    color: #fff;
    box-shadow: 0px 0px 3px rgb(0 0 0 /16%);
    opacity: 0.9;
  }
`;

export const XMLButton = styled(Button)`
  max-width: 130px;

  &:before {
    background-image: url(${airplane_icon});
  }
`;

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  height: 50px;

  color: #fff;
  font-size: 16px;
  font-weight: 700;

  border: 0;
  border-radius: 8px;

  cursor: pointer;
  background-color: var(--blue);
  transition: all 0.2s;

  &:before {
    content: '';
    position: relative;

    width: 18px;
    height: 18px;

    background: no-repeat center;
    background-size: contain;
  }

  &:hover {
    color: #fff;
    box-shadow: 0px 0px 3px rgb(0 0 0 /16%);
    opacity: 0.9;
  }

  max-width: 145px;

  &:before {
    background-image: url(${airplane_icon});
  }
`;

export const AddButton = styled(Button)`
  margin-left: 0.5rem;

  max-width: 200px;

  &:before {
    background-image: url(${add_icon});
  }
`;

export const DownloadIcon = styled(DownloadIconRaw)`
  height: 16px;
  margin-right: 8px;
`;

export const DownloadButton = styled(Button)`
  max-width: 140px;

  &:before {
    background-image: url(${light_download});
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  max-width: 130px;
  height: 50px;

  margin-left: auto;

  color: #fff;
  font-size: 16px;
  font-weight: 700;

  border: 0;
  border-radius: 8px;

  cursor: pointer;
  background-color: #ff9700;
  transition: all 0.2s;

  &:after {
    content: '';
    position: relative;

    width: 15px;
    height: 15px;

    background: no-repeat center;
    background-size: contain;
    background-image: url(${chevron_down});

    transform: ${({ collapsed }: { collapsed: boolean }) =>
      collapsed ? 'scale(-1)' : 'scale(1)'};
  }

  &:hover {
    color: #fff;
    box-shadow: 0px 0px 3px rgb(0 0 0 /16%);
    opacity: 0.9;
  }
`;

export const FiltersWrapper = styled.div`
  display: ${({ expand }: { expand: boolean }) => (expand ? 'flex' : 'none')};
  flex-direction: column;
  gap: 20px;

  width: 100%;

  padding: 0px 32px;

  overflow-y: hidden;

  animation: slide_down 1s forwards ease-in-out;
`;

export const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const SecondaryFilters = styled.div`
  width: 100%;

  display: flex;
  gap: 15px;

  padding: 15px 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const SecondaryButton = styled.button`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 120px;
  max-width: 120px;
  height: 40px;

  color: ${({ active }: { active: boolean }) =>
    active ? '#fff' : 'var(--blue)'};
  font-size: 12px;

  border: 0;
  border-radius: 5px;

  cursor: pointer;
  transition: all 0.2s;
  background: ${({ active }: { active: boolean }) =>
    active ? 'var(--blue)' : '#e8eaff'};

  box-shadow: 0px 2px 4px rgb(0 0 0 /16%);

  &:hover {
    opacity: 0.8;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
`;

export const InfoGroup = styled.section`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  max-width: 250px;
`;

export const BlockedInfoGroup = styled(InfoGroup)`
  display: block;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  max-width: 375px;
  min-height: 50px;

  padding: 5px 0px;

  font-size: 14px;
  color: #002e75;

  .ant-picker {
    padding: 15px 0;

    border: 0;
    border-bottom: 1px solid #888888;

    &:focus {
      outline: none;
      border-bottom: 1px solid var(--lightblue);
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  min-height: 30px;

  padding: 5px 0;

  font-size: 18px;
  color: #4f4f4f;

  border: 0;
  border-bottom: 1px solid #888888;
  transition: all 0.5s;

  &:focus {
    outline: none;
    border-bottom: 1px solid var(--lightblue);
  }
`;

export const SelectLabel = styled(Label)`
  .ant-select {
    font-family: 'Ubuntu', sans-serif;
    font-size: 18px;
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

export const SectionButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: flex-end;
`;
