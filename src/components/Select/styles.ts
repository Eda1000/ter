import styled from 'styled-components';

export const Container = styled.div`
  .ant-select{
    cursor: pointer;
    background: #fff;
    border: 0;
    width: 100%;
    height: 4rem;
    min-height: 50px;
    border-radius: 4px;
    padding: 1rem 0px;
    box-shadow: 0px 3px 6px #00000029;
    font-size: 1.2rem;
    color: var(--blue);
    outline: transparent;
    display: flex;
    align-items: center;

    @media (max-width: 450px) {
      min-width: 100%;
      margin: 0.5rem 0px;
    }
  }

  .ant-select-selection-placeholder {
    font-size: 1.1rem;
    color: #969291 !important;
  }

  .ant-select-selector {
    border: 0 !important;
    border-radius: 4px !important;
    box-shadow: 0 !important;
  }

  .ant-select-dropdown {
    font-size: 1.1rem;
    color: #969291;
  }

  .ant-select-item-option-content {
    padding: 1rem 0 !important;
  }

  .ant-select-arrow {
    color: var(--blue);
    font-size: 1rem;
    width: 30px;
  }
`;
