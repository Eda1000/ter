import styled from 'styled-components';

interface Props {
  status?: string;
}

const statusColor: { [key: string]: string } = {
  criado: '#047D10',
  cubado: '#047D10',
  coletado: '#047D10',
  recebido: '#047D10',
  separado: '#047D10',
  armazenado: '#047D10',
  'aguardando guia de imposto': '#FF8800',
  'aguardando carta de correção/isenção': '#FF8800',
  'aguardando agendamento': '#FF8800',
  'programado para entrega': '#047D10',
  'em rota': '#047D10',
  'entregue com sucesso': '#047D10',
};

const statusBakcground: { [key: string]: string } = {
  criado: '#E6FFE3',
  cubado: '#E6FFE3',
  coletado: '#E6FFE3',
  recebido: '#E6FFE3',
  separado: '#E6FFE3',
  armazenado: '#E6FFE3',
  'aguardando guia de imposto': '#F9FFBB',
  'aguardando carta de correção/isenção': '#F9FFBB',
  'aguardando agendamento': '#F9FFBB',
  'programado para entrega': '#F9FFBB',
  'em rota': '#E6FFE3',
  'entregue com sucesso': '#E6FFE3',
};

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 960px;

  margin-top: 30px;

  background: #fff;
  border-radius: 19px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  @media (max-width: 568px) {
    padding: 0 30px;
  }
`;

export const ButtonTable = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  max-width: 120px;
  height: 40px;
  margin: 0 auto;
  overflow: hidden;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 100;
  text-overflow: ellipsis;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--blue);
  transition: all 0.2s;
  margin-top: 5px;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 960px;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;

  .table_position {
    font-size: 0.6rem;
    color: #000;
  }

  tr {
    background-color: #fff;
  }

  tr:nth-of-type(odd) {
    background-color: #f0f4fc;
  }

  th,
  td {
    padding: 15px;
    font-size: 0.6rem;
    word-wrap: break-word;
  }
  th {
    font-weight: 500;
    color: #002e75;

    border-radius: 19px 19px 0 0;
    background-color: #fff;
  }
  td {
    max-width: 300px;

    color: #000;

    word-break: break-word;

    &:last-child {
      background-color: #fff;
    }
  }
  p {
    margin-bottom: 0;
  }

  .table__order-info {
    cursor: pointer;

    &:hover {
      filter: brightness(0.95);
    }
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

      max-width: unset;
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

export const Status = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 77px;
  min-height: 70px;
  padding: 8px;
  font-size: 12px;
  text-align: center;
  color: ${({ status }) =>
    (status && statusColor[status as string]) || 'var(--blue)'};
  border-radius: 10px;
  background: ${({ status }) =>
    (status && statusBakcground[status as string]) || '#0464fd47'};
  @media (min-width: 568px) {
    margin-left: auto;
  }
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  z-index: 50;
  inset: 0px;
  background-color: rgba(142, 142, 147, 0.6);

  .action-input__barcode {
    padding: 8px;
    border-radius: 8px;
    width: 80%;
  }
`;

export const ModalWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 0px 6px rgb(0 0 0 / 16%);
  padding: 15px;
`;

export const BarCodeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 260px;
  height: 100%;
`;

export const Close = styled.div`
  &.close {
    color: #888888;
    font-size: 30px;
    font-weight: bold;
    margin: -10px 10px -10px auto;
    cursor: pointer;
  }
`;
