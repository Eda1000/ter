import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Pagination, Select } from 'antd';
import { toast } from 'react-toastify';

import { PaginationContainer } from '../../components/PaginationContainer';
import { Spinner } from '../../components/Spinner/Spinner';

import api from '../../services/api';

import add_icon from '../../assets/general/plus_icon.svg';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
  Container,
  Content,
  NewLoadingButton,
  PageTitle,
  SelectLabel,
  StatusDelivered,
  StatusLoaded,
  Table,
  TableWrapper,
  TitleContent,
  TitleRow,
} from './styles';

export interface Invoice {
  id: string;
  invoice_number: string;
  order_number: string;
  client_name: string;
  cubage: string;
  amount_boxes: number;
  invoice_was_received: boolean;
  cep: string;
  address: string;
  longitude: number;
  latitude: number;
  status: string;
  was_delivered: boolean;
  position_occupied: boolean;
  position_id?: any;
  delivery_time: Date;
  delivery_order: number;
  user_id: string;
  truck_id: string;
  truck: { name: string };
  driver_id: string;
  current_status?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Delivery {
  id: string;
  truck_route_id: string;
  invoice_id: string;
  invoice: Invoice;
  created_at: Date;
  updated_at: Date;
  current_status: string;
}

export const ListDeliveryRoutes = () => {
  const { Option } = Select;
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await api.get(`invoice-routes/deliver`);

      if (response) {
        setDeliveries(response.data.results);

        setTotal(response.data.total);
        setPage(response.data.page);
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

  const handleChangePage = async (e: number) => {
    setLoading(true);
    try {
      const response = await api.get(`incidents?page=${e}limit=50`);

      if (response) {
        setDeliveries(response.data.results);
        setPage(e);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const goToLoadingMap = (id: string) => {
    history.push(`/rota-de-carregamento/${id}`);
  };

  const handleChangeSelection = (value: any) => {
    console.log(`selected ${value}`);
  };

  const renderLoading = () => {
    return (
      deliveries &&
      deliveries.map(({ created_at, invoice, current_status, id }, index) => {
        const date = new Date(created_at).toLocaleDateString('pt-BR');
        const hour = new Date(created_at).toLocaleTimeString('pt-BR');

        return (
          <tr key={index} onClick={() => goToLoadingMap(id)}>
            <td data-label="Data">
              <p>{date}</p>
              <p>{hour}</p>
            </td>

            <td data-label="Caminhão">
              <span>{invoice.truck?.name}</span>
            </td>

            <td data-label="Primeira Entrega">
              <span>{invoice.order_number}</span>
            </td>

            <td data-label="Status">
              {current_status && <StatusLoaded>{current_status}</StatusLoaded>}
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <Header />
      <Sidebar />
      <TitleContent>
        <TitleRow>
          <PageTitle>Rotas de entrega</PageTitle>

          <Link to="/mapa-de-roteirizacao">
            <NewLoadingButton>
              <img src={add_icon} alt="ícone de adicionar" />
              <span>Novo</span>
            </NewLoadingButton>
          </Link>

          {/* <SelectLabel>
            Visualização
            <Select
              bordered={false}
              defaultValue="all-deliveries"
              onChange={handleChangeSelection}
            >
              <Option value="all-deliveries">Todos os carregamentos</Option>
              <Option value="pending-frequency">
                Carregamentos com frequência pendente
              </Option>
              <Option value="selected-driver">
                Carregamentos deste motorista
              </Option>
              <Option value="selected-user">
                Carregamentos criados por este usuário
              </Option>
            </Select>
          </SelectLabel> */}
        </TitleRow>
      </TitleContent>

      <Container>
        <Content>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Caminhão</th>
                  <th>Primeira Entrega</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>{renderLoading()}</tbody>
            </Table>

            <PaginationContainer>
              {loading ? (
                <Spinner />
              ) : (
                <Pagination
                  defaultCurrent={page}
                  total={total}
                  onChange={(e: number) => handleChangePage(e)}
                  showSizeChanger={false}
                  hideOnSinglePage={true}
                />
              )}

              {!loading &&
                deliveries.length === 0 &&
                'Não há entregas no momento'}
            </PaginationContainer>
          </TableWrapper>
        </Content>
      </Container>
    </>
  );
};
