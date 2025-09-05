import styled from 'styled-components';

import add_icon from '../../assets/general/add_icon.svg';

export const Container = styled.div`
  &.order-details {
    display: flex;
    flex-direction: column;

    width: 100%;
  }

  .box-select__footer {
    bottom: 15px;
  }
`;

export const Close = styled.div`
  &.close {
    color: #888888;
    font-size: 30px;
    font-weight: bold;

    margin: -20px 0 -20px auto;

    cursor: pointer;
  }
`;

export const OrderInfo = styled.div`
  &.order-info {
    display: flex;
    flex-direction: column;
    gap: 10px;

    width: calc(80vw - 15px);
    max-width: 900px;
    max-height: 60vh;

    margin: 15px;
    padding: 0 15px;

    overflow: auto;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #d8d9dc;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #0e5edc;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #0e5edc;
    }

    .order-info__buttons-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;

      width: 100%;
      max-width: 550px;
    }

    .action-input__barcode{
      padding: 0 8px;

      border-radius: 8px;
    }

    .order-info__bar-code{
      font-size: 1rem;
      color: #0e5edc;
    }

    .order-info__buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-left: auto;

      .receipt-input{
        width: 190px;
        height: 40px;
        padding: 0 10px;

        font-size: 0.8rem;
        font-weight: 700;

        border: 2px solid #ccc;
        border-radius: 8px;
        outline: 0;
      }
    }

    .order-info__tab-button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 240px;
      min-height: 50px;

      font-size: 1.2rem;

      color: var(--blue);

      border-radius: 10px;
      cursor: pointer;

      transition: all 0.1s ease-in-out;
    }

    .order-info__tab-button.active {
      color: var(--orange);
      font-weight: bold;

      box-shadow: 0 3px 6px rgb(0 0 0 /16%);
    }

    .order-info__info {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .order-info__titled-table-wrapper {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .order-info__table-title {
      color: var(--orange);
      font-size: 1.2rem;
      font-weight: 500;
    }

    .order-info__table-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;

      width: 100%;
      padding: 15px 10px;
      border-radius: 20px;

      box-shadow: 0 3px 6px rgb(0 0 0 / 25%);
    }

    .order-info__table-wrapper__buttons-wrapper {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }

  @media (max-width: 992px) {
    .order-info__table-wrapper {
      flex-wrap: wrap;
    }
  }
`;

export const Table = styled.table`
  &.table {
    width: 100%;
    max-width: 960px;
    vertical-align: middle;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;

    .table__information-span {
      display: inline-flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: space-between;

      word-break: break-all;
    }

    .table__information-more {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 20px;
      height: 20px;

      color: #fff;
      font-size: 13px;
      font-weight: bolder;

      background-color: var(--orange);
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        transform: scale(1.1);
      }
    }

    .table__status-icon {
      @media (max-width: 992px) {
        margin-left: auto;
      }
    }

    .table__actions-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;

      @media (max-width: 992px) {
        margin-left: auto;
      }
    }

    .table__actions-wrapper__action {
      display: flex;
      gap: 2px;

      cursor: pointer;
    }

    .free-item {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      max-width: 105px;
      min-height: 45px;
      padding: 4px;

      color: #fff;
      text-align: center;

      background-color: var(--blue);
      border-radius: 5px;
    }

    .delete-item {
      color: #f00;
    }

    tr {
      border-bottom: 1px solid #d4dbe7;
    }

    th,
    td {
      padding: 8px;
      font-size: 0.7rem;
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
  }

  .occurrence-image__button{
    font-size: 0.9rem;
    color: var(--blue);

    border: 0;
    background: transparent;
  }
`;

export const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 190px;

  height: 40px;

  color: #fff;
  font-size: 0.8rem;
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
    background-image: url(${add_icon});
  }

  &:hover {
    color: #fff;
    box-shadow: 0px 0px 3px rgb(0 0 0 /16%);
    opacity: 0.9;
  }
`;

export const SeeMoreButton = styled(AddButton)`
  color: #0e5edc;
  background-color: #fff;

  box-shadow: 0px 3px 6px rgb(0 0 0 /16%);

  &:hover {
    color: #0e5edc;
    box-shadow: 0px 3px 6px rgb(0 0 0 /30%);

    opacity: 0.9;
  }

  &:before {
    display: none;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 190px;
  max-width: 190px;
  height: 40px;

  margin: 0 auto;

  overflow: hidden;

  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  text-overflow: ellipsis;

  border: 0;
  border-radius: 8px;

  cursor: pointer;
  background-color: var(--blue);
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.9;
  }

  &.action-button--withheld-invoice {
    background-color: var(--orange);
  }

  &.action-button--local-delivery {
    background-color: var(--lightblue);
  }

  &.action-button--delete {
    background: #ff0720;

  }
`;

export const Incidents = styled.div`
  &.incidents {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .incident__image{
    max-width: 90%;
    margin: 0 auto;
    max-height: 400px;

    display: block;
    object-align: contain;
  }

  .incidents__title {
    color: var(--blue);
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export const Goback = styled.img`
  width: 12px;
  height: 12px;

  cursor: pointer;

  transition: all 0.5s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const SeeImage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: var(--orange);
  font-size: 0.9rem;

  img {
    width: 17px;
    height: 17px;
  }
`;

export const AddIncident = styled.div`
  &.add-incident {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .add-incident__title {
    color: var(--orange);
    font-size: 1.2rem;
    font-weight: bold;
  }

  .add-incident__field-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    width: 100%;
    gap: 15px;
  }
`;

export const Label = styled.label`
  &.field-label {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    max-width: 400px;
    min-height: 40px;
    padding: 5px 0px;

    margin-top: 10px;

    font-size: 1.2rem;
    color: var(--blue);

    &.extended {
      max-width: 100%;
    }

    .field-label__input {
      width: 100%;
      min-height: 25px;
      padding: 5px 0;

      color: #4f4f4f;
      font-size: 1.2rem;
      border: 0;

      border-bottom: 1px solid #888888;
      transition: all 0.5s;
    }
  }

  .field-label-value{
    font-size: 1rem;
    color: var(--orange);
  }
`;

export const SendFileButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  max-width: 275px;
  height: 50px;

  margin: auto 5px 5px auto;
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

export const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  width: 100%;
  max-width: 205px;
  min-height: 47px;

  margin: 15px 5px 0 auto;
  padding: 5px 10px;

  border: 0;
  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

  color: #fff !important;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;

  background: var(--green);

  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 759px) {
    max-width: 205px !important;
    margin: 5px auto;
  }
`;

export const OrderOperators = styled.div`
  &.order-operators {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .order-operators__title {
      color: var(--orange);
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;
