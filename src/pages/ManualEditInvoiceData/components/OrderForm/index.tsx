import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

import api from '../../../../services/api';

import { FaTelegramPlane } from 'react-icons/fa';
import { IoHandRightSharp } from 'react-icons/io5';
import { HiBadgeCheck } from 'react-icons/hi';

import { InputContainer, Footer } from './styles';

interface OrderFromProps {
  setStep: Function;
  setOrderID: Function;
}

export const OrderForm: React.FC<OrderFromProps> = ({
  setStep,
  setOrderID,
}) => {
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [amountBoxes, setAmountBoxes] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const validateFields = () => {
    if (
      !loading &&
      orderNumber !== '' &&
      customerName !== '' &&
      amountBoxes !== ''
    ) {
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    const createdOrderID = {
      amount_boxes: Number(amountBoxes),
      client_name: customerName,
      order_number: orderNumber,
    };

    saveInvoice(createdOrderID);
  };

  const saveInvoice = async (createdOrderID: object) => {
    setLoading(true);

    try {
      const response = await api.post(`invoices`, createdOrderID);

      if (response) {
        setOrderID(response.data.id);

        setStep(1);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: string) => {
    toast.error(error);
  };

  const sanitize = (value: string) => {
    let sanitized = value.replace(/\D/g, '');

    return sanitized;
  };

  return (
    <>
      <InputContainer>
        <div>
          <label>Pedido</label>
          <input onChange={(e) => setOrderNumber(e.target.value)} />
        </div>

        <div>
          <label>Nome do cliente</label>
          <input onChange={(e) => setCustomerName(e.target.value)} />
        </div>

        <div>
          <label>Quantidade de caixas</label>
          <input
            value={amountBoxes}
            onChange={(e) => setAmountBoxes(sanitize(e.target.value))}
          />
        </div>
      </InputContainer>

      <Footer>
        {/* <button type="button">
          <IoHandRightSharp />
          Congelar
        </button> */}

        {/* <button type="button">
          <FaTelegramPlane />
          Enviar XML
        </button> */}

        <button
          type="button"
          onClick={() => {
            handleConfirm();
          }}
          disabled={validateFields()}
        >
          {loading ? (
            <>
              Salvando
              <LoadingOutlined />
            </>
          ) : (
            <>
              <HiBadgeCheck />
              Salvar seção
            </>
          )}
        </button>
      </Footer>
    </>
  );
};
