import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ICollectionInformation } from '../../../../Interfaces/CollectionInformation';
import { Invoice } from '../../../../Interfaces/HomeInterface';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { ReadInvoiceModal } from '../../../../components/ReadInvoiceModal';
import { Boxes } from '../../../../hooks/Boxes';
import api from '../../../../services/api';
import {
  DeleteButton,
  Footer,
  InfoContainer,
  InfoText,
  InfoTitle,
  InformationRow,
  ReadInvoiceButton,
  SaveButton,
} from './styles';

interface Props {
  collectionInformation?: ICollectionInformation;
  initialInvoiceId?: string;
  boxes?: Boxes[];
  reset: () => void;
}

export const Finish = ({
  collectionInformation,
  initialInvoiceId,
  boxes = [],
  reset,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isReadingInvoice, setIsReadingInvoice] = useState(false);
  const [invoice, setInvoice] = useState<Invoice>();

  const navigate = useNavigate();

  useEffect(() => {
    if (initialInvoiceId) {
      getInvoice();
    }
  }, [initialInvoiceId]);

  const getInvoice = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/invoices/${initialInvoiceId}`);

      setInvoice(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmSave = async () => {
    try {
      setLoading(true);

      const payload = {
        invoice_id: initialInvoiceId,
        collection_information_id: collectionInformation?.id,
      };

      await api.post('/invoices/confirm-order-shipment', payload);

      setShowConfirmSave(false);
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteInvoice = async () => {
    try {
      await api.delete(`/invoices/${invoice?.id}`);

      toast.success('Pedido excluído com sucesso!');

      setShowConfirmDelete(false);
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleReadBarcode = async (barCode: string) => {
    setShowInvoiceModal(false);

    try {
      setIsReadingInvoice(true);

      await api.post(`/invoices/${invoice?.id}/confirm-invoice-access-key`, {
        collection_information_id: collectionInformation?.id,
        access_key: barCode,
      });

      toast.success('Nota lida com sucesso!');

      getInvoice();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || '';

      if (errorMessage.includes('Erro ao buscar dados da nota fiscal')) {
        return toast.error('A nota inserida não pertence a este pedido');
      }

      toast.error(errorMessage);
    } finally {
      setIsReadingInvoice(false);
    }
  };

  return (
    <>
      <InfoContainer>
        <InformationRow>
          <InfoTitle>Capacidade do caminhão:</InfoTitle>
          <InfoText>
            {collectionInformation?.truck?.total_weight || ''}kg
          </InfoText>
        </InformationRow>
        <InformationRow>
          <InfoTitle>Capacidade do caminhão:</InfoTitle>
          <InfoText>{collectionInformation?.truck?.capacity || ''}m³</InfoText>
        </InformationRow>
        <InformationRow>
          <InfoTitle>Volume total:</InfoTitle>
          <InfoText>{Number(invoice?.cubage || 0).toFixed(3) || ''}m³</InfoText>
        </InformationRow>
        <InformationRow>
          <InfoTitle>Nº do pedido:</InfoTitle>
          <InfoText>{invoice?.order_number}</InfoText>
        </InformationRow>
        <InformationRow>
          <InfoTitle>Nome do cliente:</InfoTitle>
          <InfoText>{invoice?.client_name}</InfoText>
        </InformationRow>
        <InformationRow>
          <InfoTitle>Nº de caixas:</InfoTitle>
          <InfoText>{`${invoice?.amount_read_labels || 0}/${
            invoice?.amount_boxes || 0
          }`}</InfoText>
        </InformationRow>
      </InfoContainer>
      <Footer>
        <ReadInvoiceButton
          type="button"
          onClick={() => setShowInvoiceModal(true)}
          disabled={isReadingInvoice || loading}
        >
          Ler nota
        </ReadInvoiceButton>
        <DeleteButton
          type="button"
          disabled={isReadingInvoice || loading}
          onClick={() => setShowConfirmDelete(true)}
        >
          Excluir pedido
        </DeleteButton>
        <SaveButton
          type="button"
          onClick={() => setShowConfirmSave(true)}
          disabled={isReadingInvoice || loading}
        >
          {loading ? (
            <>
              <LoadingOutlined />
              Salvando
            </>
          ) : (
            <>
              <HiBadgeCheck />
              Confirmar embarque
            </>
          )}
        </SaveButton>
      </Footer>
      {showConfirmSave && (
        <ConfirmModal
          onClose={() => setShowConfirmSave(false)}
          onConfirm={confirmSave}
          title="Deseja realmente confirmar o embarque?"
          cancelText="Cancelar"
          confirmText="Confirmar"
        />
      )}
      {showConfirmDelete && (
        <ConfirmModal
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={confirmDeleteInvoice}
          title="Deseja realmente excluir o pedido?"
          cancelText="Cancelar"
          confirmText="Excluir"
        />
      )}
      {showInvoiceModal && (
        <ReadInvoiceModal
          onClose={() => setShowInvoiceModal(false)}
          onSuccessfulRead={handleReadBarcode}
        />
      )}
    </>
  );
};
