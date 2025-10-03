import styled from 'styled-components';

interface RouteEye {
  color: string;
  visible: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  &.wrapper {
    position: relative;
    display: flex;

    height: min-content;

    border-right: 3px solid #dedede;

    .wrapper__column {
      display: flex;
      flex-direction: column;
    }

    .table-container__add-route-row {
      width: 100%;
      padding: 15px;
    }

    .table-container__resizer-indicator {
      position: relative;

      right: -5px;
      top: 0;
      width: 10px;
      height: inherit;
      min-height: 100vh;

      cursor: col-resize;

      opacity: 0;

      background-color: red;
    }

    .vehicle-select {
      width: 280px !important;
    }
  }
`;

export const TableContainer = styled.div`
  &.table-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 50vw;
    min-width: 200px;
    overflow-x: scroll;

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #0e5edc73;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #0e5edc73;
    }

    ::-webkit-scrollbar-track:vertical {
      display: none;
    }

    ::-webkit-scrollbar-thumb:vertical {
      display: none;
    }

    .table-container__resizer {
      width: 10px;
      height: 100%;

      background-color: red;

      cursor: col-resize;
    }
  }
`;

export const Table = styled.table`
  &.table {
    min-width: 200px;
    width: 100%;

    font-size: 0.8rem;
    text-align: left;
    vertical-align: middle;

    border-collapse: collapse;

    border-spacing: 0;
    border-radius: 20px;

    .ant-select {
      width: 120px;
    }

    .table__driver-name {
      width: 80px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .table__amounts {
      font-size: 14px;
      padding: 0;
    }

    .button-span {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      font-size: 13px;
      padding: 0;

      max-width: 100px;
      height: 30px;
    }

    .exceeded_capacity {
      color: #f00 !important;
      font-weight: bold;
    }

    th {
      white-space: nowrap;

      border-bottom: 2px solid #d9d9d9;
    }

    thead tr {
      height: 80px;
    }

    tbody tr {
      height: 48px;
    }

    tr:not(:last-child) {
      border-bottom: 2px solid #d9d9d9;
    }

    th,
    td {
      padding: 10px 5px;
    }
    th {
      font-size: 0.8rem;
      font-weight: 700;
      color: #002e75;
    }
    td {
      font-size: 1rem;
    }
  }
`;

export const TagColor = styled.td<{ color?: string }>`
  div {
    display: flex;
    align-items: center;

    span {
      display: block;
      background: ${(props) => props.color && `${props.color}`};
      height: 15px;
      width: 30px;
      border-radius: 20px;
      margin-right: 6px;
    }
  }

  div {
    font-weight: bold;
    color: ${(props) => props.color && `${props.color}`};
  }
`;

export const EyeIndicator = styled.td<RouteEye>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
  .eye {
    display: block;
    position: relative;

    width: 20px;
    height: 20px;

    border: solid 3px ${({ color }) => color && `${color}`};

    border-radius: 75% 15%;

    transform: rotate(45deg);

    cursor: pointer;

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      border: solid 3px ${({ color }) => color && `${color}`};
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &:after {
      content: '';

      display: ${({ visible }) => (visible ? 'block' : 'none')};
      position: absolute;

      top: 36%;
      left: 50%;
      width: 27px;
      height: 4px;

      transform: translate(-50%) rotate(95deg);

      background: ${({ color }) =>
        color &&
        `linear-gradient(90deg, ${color} 25%, #fff 25%, #fff 75%, ${color} 75%)`};
    }
  }
`;

export const AvailableInvoicesEye = styled(EyeIndicator)`
  height: 20px;

  position: absolute;
  right: 0px;
`;

export const AddRoute = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  max-width: 280px;
  height: 50px;

  margin: 0 auto;

  color: #fff;
  font-size: 16px;
  font-weight: 700;

  border-radius: 8px;

  cursor: pointer;
  background-color: var(--blue);
  transition: all 0.2s;

  &:hover {
    color: #fff;
    box-shadow: 0px 0px 3px rgb(0 0 0 /16%);
    opacity: 0.9;
  }
`;
