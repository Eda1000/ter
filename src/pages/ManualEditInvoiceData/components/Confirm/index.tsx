import { useState } from 'react';

import api from '../../../../services/api';
import { toast } from 'react-toastify';

import { Spinner } from '../../../../components/Spinner/Spinner';
import { HiBadgeCheck } from 'react-icons/hi';

import {
  Container,
  SearchWrapper,
  SearchBoxContainer,
  SearchBox,
  SearchButton,
  InputContainer,
  ConfirmButton,
} from './styles';

interface Invoice {
  invoice_number: string;
  client_name: string;
  city: string;
  cep?: string;
  weight: number | null;
  neighborhood?: string;
  number?: string;
  status?: string;
  street?: string;
  uf?: string;
}

interface OrderFromProps {
  setStep: (step: number) => void;
  invoiceID: string;
}

export const Confirm: React.FC<OrderFromProps> = ({ setStep, invoiceID }) => {
  const emptyInvoiceData = {
    invoice_number: '',
    client_name: '',
    city: '',
    cep: '',
    weight: null,
    neighborhood: '',
    number: '',
    status: 'Não autorizado',
    street: '',
    uf: '',
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [invoiceWasReceipt, setInvoiceWasReceipt] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<Invoice>(emptyInvoiceData);

  const [invoiceNumber, setInvoiceNumber] = useState<string>();
  const [hasSearchForInvoice, setHasSearchForInvoice] =
    useState<boolean>(false);

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const renderFields = () => {
    if (invoiceData) {
      return (
        <InputContainer>
          <div>
            <label>Numero da Nota</label>
            <input
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  invoice_number: e.target.value,
                })
              }
              defaultValue={invoiceData && invoiceData.invoice_number}
            />
          </div>

          <div>
            <label>Cliente</label>
            <input
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, client_name: e.target.value })
              }
              defaultValue={invoiceData && invoiceData.client_name}
            />
          </div>

          <div>
            <label>Endereço</label>
            <input
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, street: e.target.value })
              }
            />
          </div>

          <div>
            <label>Numero</label>
            <input
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, number: e.target.value })
              }
            />
          </div>

          <div>
            <label>Bairro</label>
            <input
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, neighborhood: e.target.value })
              }
            />
          </div>

          <div>
            <label>Cidade</label>
            <input
              defaultValue={invoiceData && invoiceData.city}
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, city: e.target.value })
              }
            />
          </div>

          <div>
            <label>Estado</label>
            <input
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, uf: e.target.value })
              }
              defaultValue={invoiceData && invoiceData.uf}
            />
          </div>

          <div>
            <label>CEP</label>
            <input
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, cep: e.target.value })
              }
            />
          </div>

          <div>
            <label>Peso</label>
            <input
              type="number"
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  weight: Number(e.target.value),
                })
              }
              defaultValue={invoiceData.weight || ''}
            />
          </div>
        </InputContainer>
      );
    }
  };

  const handleConfirmInvoice = async () => {
    setLoading(true);

    try {
      const response = await api.post(
        `invoices/${invoiceID}/confirm`,
        invoiceData,
      );

      if (response) {
        toast.success('Nota confirmada com sucesso!', {
          autoClose: 3000,
          onClose: () => setStep(4),
        });
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const renderConfirmation = () => {
    if (loading) {
      return (
        <p>
          <Spinner />
        </p>
      );
    }

    if (invoiceWasReceipt) {
      return (
        <>
          {renderFields()}

          <ConfirmButton onClick={() => handleConfirmInvoice()}>
            <HiBadgeCheck />
            Confirmar
          </ConfirmButton>
        </>
      );
    }

    if (!invoiceWasReceipt && hasSearchForInvoice) {
      return (
        <>
          <p>Esta nota ainda não foi recebida.</p>

          <p>Informe os dados abaixo para confirmar a nota</p>

          {renderFields()}

          <ConfirmButton onClick={() => handleConfirmInvoice()}>
            <HiBadgeCheck />
            Confirmar
          </ConfirmButton>
        </>
      );
    }
  };

  const disableButton = () => {
    if (
      invoiceData.invoice_number !== '' &&
      invoiceData.client_name !== '' &&
      invoiceData.city !== '' &&
      invoiceData.cep !== '' &&
      invoiceData.weight !== null &&
      invoiceData.neighborhood !== '' &&
      invoiceData.number !== '' &&
      invoiceData.status !== '' &&
      invoiceData.street !== '' &&
      invoiceData.uf !== ''
    ) {
      return false;
    }

    return true;
  };

  const fetchInvoice = async () => {
    setLoading(true);
    setHasSearchForInvoice(true);
    setInvoiceWasReceipt(false);
    setInvoiceData(emptyInvoiceData);

    try {
      const response = await api.get(`invoices/${invoiceNumber}/bsoft`);

      if (response) {
        if (response.data.status !== 'error') {
          setInvoiceData({
            ...invoiceData,
            invoice_number: String(response.data.numero),
            client_name: response.data.destinatario_nome,
            city: response.data.destinatario_municipio,
            weight: response.data.peso,
            uf: response.data.destinatario_uf,
            status: response.data.situacao,
          });
          setInvoiceWasReceipt(true);
        }
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();

    fetchInvoice();
  };

  return (
    <>
      <Container>
        <SearchWrapper>
          <SearchBoxContainer>
            <SearchBox
              placeholder="Digite o número da nota"
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </SearchBoxContainer>

          <SearchButton
            disabled={!invoiceNumber || loading}
            onClick={(e) => handleSearch(e)}
          >
            Buscar
          </SearchButton>
        </SearchWrapper>
        {renderConfirmation()}
      </Container>
    </>
  );
};
