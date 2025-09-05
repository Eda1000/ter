import { useState } from 'react';

import { HiBadgeCheck } from 'react-icons/hi';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import api from '../../../../services/api';

import { ICollectionInformation } from '../../../../Interfaces/CollectionInformation';
import { Invoice } from '../../../../Interfaces/HomeInterface';
import { Footer, InputContainer } from './styles';

interface OrderFromProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice | undefined>>;
  collectionInformation?: ICollectionInformation;
}

export const OrderForm: React.FC<OrderFromProps> = ({
  setStep,
  setInvoice,
  collectionInformation,
}) => {
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [amountBoxes, setAmountBoxes] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const validateFields = () => {
    if (!loading && orderNumber !== '' && amountBoxes !== '') {
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    const payload = {
      amount_boxes: Number(amountBoxes),
      client_name: customerName || '-',
      order_number: orderNumber,
      collection_information_id: collectionInformation?.id,
    };

    try {
      setLoading(true);
      const response = await api.post<Invoice>(
        `invoices/manually/app`,
        payload,
      );

      if (response) {
        setInvoice(response.data);
        setStep(2);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
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

        {/* <div>
          <label>Nome do cliente</label>
          <input onChange={(e) => setCustomerName(e.target.value)} />
        </div> */}

        <div>
          <label>Quantidade de caixas</label>
          <input
            value={amountBoxes}
            onChange={(e) => setAmountBoxes(sanitize(e.target.value))}
          />
        </div>
      </InputContainer>

      <Footer>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={validateFields()}
        >
          {loading ? (
            <>
              <LoadingOutlined />
              Salvando
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
