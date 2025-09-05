import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import api from '../../../../services/api';

import { IoHandRightSharp } from 'react-icons/io5';

import { Container, Table, Header } from './styles';
import { PaginationContainer } from '../../../../components/PaginationContainer';
import { Spinner } from '../../../../components/Spinner/Spinner';

interface Status {
  status: string;
  comment: string;
  invoice_status: {
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

interface StatusProps {
  invoiceID: string;
}

export const Status: React.FC<StatusProps> = ({ invoiceID }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [invoiceStatus, setInvoiceStatus] = useState<Status[]>([]);

  useEffect(() => {
    fetchInvoiceStatus();
  }, []);

  const fetchInvoiceStatus = async () => {
    if (invoiceID) {
      setLoading(true);
      try {
        const response = await api.get(`invoices/${invoiceID}/status`);

        if (response) {
          setInvoiceStatus(response.data);
        }
      } catch (error: any) {
        handleError(error.response?.data?.message || error.toString());
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const renderStatus = () => {
    return invoiceStatus.map(({ invoice_status, updated_at }, index) => {
      const date = new Date(updated_at).toLocaleDateString('pt-BR');
      const hour = new Date(updated_at).toLocaleTimeString('pt-BR');
      return (
        <tr key={index}>
          <td data-label="Status">{invoice_status?.name}</td>

          <td data-label="Comentário">{invoice_status?.description}</td>

          {/* <td data-label="Usuário">{user}</td> */}

          <td data-label="Data">
            {date} - {hour}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Container>
        <Header>
          {/* <button type="button">
            <IoHandRightSharp />
            Congelar
          </button> */}
        </Header>

        {invoiceStatus.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Comentário</th>
                {/* <th>Usuário</th> */}
                <th>Data</th>
              </tr>
            </thead>
            <tbody>{renderStatus()}</tbody>
          </Table>
        ) : (
          <PaginationContainer>Não há status no momento</PaginationContainer>
        )}
        {loading && (
          <PaginationContainer>
            <Spinner />
          </PaginationContainer>
        )}
      </Container>
    </>
  );
};
