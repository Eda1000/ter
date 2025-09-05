import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/Auth';
import { Pagination } from 'antd';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Spinner } from '../../components/Spinner/Spinner';

import add_icon from '../../assets/general/plus_icon.svg';

import {
  Container,
  Content,
  NewInvoiceButton,
  PageTitle,
  // SpinnerContainer,
  Table,
  TableWrapper,
  TitleRow,
} from './styles';

interface Invoice {
  created_at: string;
  order_number: string;
  invoice_number: string;
  client_name: string;
  cubage: string;
  position: string;
  user: { individual_person: { name: string }; legal_person: { name: string } };
  invoice_progress: InvoiceProgress[];
}

interface InvoiceStatus {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface InvoiceProgress {
  id: string;
  comment: string;
  invoice_id: string;
  invoice_status_id: string;
  invoice_status: InvoiceStatus;
  created_at: Date;
  updated_at: Date;
}

export const ListInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(100);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await api.get(`invoices?page=1&limit=50`);

      if (response) {
        setInvoices(response.data.results);
        setPage(response.data.page);
        setTotal(response.data.total);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const renderInvoices = () => {
    return invoices.map(
      (
        {
          created_at,
          order_number,
          invoice_number,
          client_name,
          cubage,
          position,
          user,
          invoice_progress,
        },
        index,
      ) => {
        const date = new Date(created_at).toLocaleDateString('pt-BR');
        const time = new Date(created_at).toLocaleTimeString('pt-BR');

        return (
          <tr key={index}>
            <td data-label="Data da criação">
              {date} {time}
            </td>

            <td data-label="Nº do Pedido">{order_number}</td>

            <td data-label="Nº da Nota">{invoice_number}</td>

            <td data-label="Nome do Cliente">{client_name}</td>

            <td data-label="Cubagem (m3)">{cubage}</td>

            <td data-label="Posição">{position}</td>

            <td data-label="Usuário">
              {user.individual_person.name || user.legal_person.name}
            </td>

            <td data-label="Status">
              {invoice_progress.length > 0 &&
                invoice_progress[0].invoice_status.name}
            </td>
          </tr>
        );
      },
    );
  };

  const handleChangePage = async (e: number) => {
    setLoading(true);

    try {
      const response = await api.get(`invoices?page=${e}&limit=50`);

      if (response) {
        setInvoices(response.data.results);
        setPage(e);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <Sidebar />

      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Notas Fiscais</PageTitle>
            <Link to="/pedido/cadastro-manual">
              <NewInvoiceButton>
                <img src={add_icon} alt="ícone de adicionar" />

                <span>Novo pedido</span>
              </NewInvoiceButton>
            </Link>
          </TitleRow>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Data criação</th>
                  <th>Nº do Pedido</th>
                  <th>Nº da Nota</th>
                  <th>Nome do Cliente</th>
                  <th>Cubagem (m3)</th>
                  <th>Posição</th>
                  <th>Usuário</th>
                  <th>Status</th>
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  <tr style={{ alignContent: 'center' }}>
                    <Spinner />
                  </tr>
                </tbody>
              ) : (
                <tbody>{renderInvoices()}</tbody>
              )}
            </Table>
          </TableWrapper>
          {!loading ? (
            <div style={{ padding: '20px 0 20px 0' }}>
              <Pagination
                defaultCurrent={page}
                total={total}
                onChange={(e) => handleChangePage(e)}
                pageSize={50}
                showSizeChanger={false}
              />
            </div>
          ) : (
            ''
          )}
        </Content>
      </Container>
    </>
  );
};
