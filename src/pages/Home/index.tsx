/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import api from '../../services/api';
import { mockGetInvoices } from '../../services/mockInvoices';
import { useAuth } from '../../hooks/Auth';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { FilterComponent } from './components/FilterComponent';
import { TableComponent } from './components/TableComponent';
import { InfoModal } from '../../components/Modal';
import { OrderDetails } from '../../components/OrderDetails/OrderDetails';

import { Invoice } from '../../Interfaces/HomeInterface';

import { Container, Content } from './styles';
import { ListInvoice } from '../../Interfaces/ListInvoices';

interface InvoicesViewResponse {
  results: ListInvoice[];
  page: number;
  total: number;
}

export const Home = () => {
  const { data } = useAuth();

  const [invoices, setInvoices] = useState<ListInvoice[]>([]);
  const [invoice, setInvoice] = useState<Invoice>();
  const [querySearch, setQuerySearch] = useState<string>();
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    searchInvoices();
  }, [querySearch, page]);

  const searchInvoices = async () => {
    setLoading(true);
    try {
      console.log(querySearch);

      const response: any = await mockGetInvoices({
        page,
        limit: 5,
        querySearch,
      });

      if (response) {
        const invoices =
          data?.user?.role?.name === 'Coleta'
            ? response.data.results.filter(
              (invoice: any) => !invoice.invoice_number,
            )
            : response.data.results;

        setInvoices(invoices);
        setPage(response.data.page);
        setTotal(response.data.total);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const onDeleteInvoice = () => {
    setPage(1);
    searchInvoices();
    setTotal(0);
    setShowOrderDetails(false);
    setInvoice(undefined);
  };

  return (
    <>
      <Header />
      <Sidebar />

      <Container>
        <Content>
          <h1>Olá, Administrador!</h1>

          <p>
            Por favor, insira as informações necessárias sobre a coleta para
            prosseguir:
          </p>

          <FilterComponent
            setQuerySearch={(newQuerySearch: string) => {
              setQuerySearch(newQuerySearch);
              setPage(1);
            }}
          />

          <TableComponent
            handleChangePage={(newPage: number) => setPage(newPage)}
            invoices={invoices}
            loading={loading}
            page={page}
            setInvoice={setInvoice}
            setShowOrderDetails={setShowOrderDetails}
            total={total}
          />
        </Content>
      </Container>

      <InfoModal
        openModal={showOrderDetails}
        setOpenModal={setShowOrderDetails}
      >
        {invoice && (
          <OrderDetails
            invoiceId={invoice.id}
            truckId={invoice.truck_id}
            setShowOrderDetails={setShowOrderDetails}
            onDeleteInvoice={onDeleteInvoice}
          />
        )}
      </InfoModal>
    </>
  );
};
