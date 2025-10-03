import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Pagination } from 'antd';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import add_icon from '../../assets/general/plus_icon.svg';

import {
  Container,
  Content,
  EditButton,
  NewIncidentButton,
  PageTitle,
  Table,
  TableWrapper,
  TitleRow,
} from './styles';
import { PaginationContainer } from '../../components/PaginationContainer';
import { Spinner } from '../../components/Spinner/Spinner';

export interface Incident {
  id: string;
  user_id: string;
  invoice_id: string;
  invoice_number: string;
  comment: string;
  is_prevented: boolean;
  created_at: string;
}

export const ListIncidents: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [incidents, setIncidents] = useState<Incident[]>([]);

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await api.get(`incidents?page=1&limit=50`);

      if (response) {
        setIncidents(response.data.results);
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

  const renderIncidentRow = () => {
    return incidents.map(
      ({ invoice_number, comment, is_prevented, id }, index) => {
        return (
          <tr
            key={index}
            onClick={() => navigate(`/editar-ocorrencia/${id}`)}
          >
            <td data-label="Nº da nota fiscal">{invoice_number}</td>
            <td data-label="Ocorrência">{comment}</td>
            <td data-label="Impediu que a entrega fosse realizada">
              {is_prevented ? 'Sim' : 'Não'}
            </td>
          </tr>
        );
      },
    );
  };

  const handleChangePage = async (e: number) => {
    setLoading(true);
    try {
      const response = await api.get(`incidents?page=${e}limit=50`);

      if (response) {
        setIncidents(response.data.results);
        setPage(e);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const renderSpinner = () => {
    return (
      <PaginationContainer>
        <Spinner />
      </PaginationContainer>
    );
  };

  return (
    <>
      <Header />

      <Sidebar />

      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Ocorrências</PageTitle>

            <Link to="/adicionar-ocorrencia">
              <NewIncidentButton>
                <img src={add_icon} alt="ícone de adicionar" />

                <span>Novo</span>
              </NewIncidentButton>
            </Link>
          </TitleRow>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Nº da nota fiscal</th>
                  <th>Ocorrência</th>
                  <th>Impediu que a entrega fosse realizada</th>
                </tr>
              </thead>

              <tbody>{renderIncidentRow()}</tbody>
            </Table>

            {loading && renderSpinner()}

            <PaginationContainer>
              <Pagination
                defaultCurrent={page}
                total={total}
                onChange={(e: number) => handleChangePage(e)}
                showSizeChanger={false}
                hideOnSinglePage={true}
              />
            </PaginationContainer>
          </TableWrapper>
        </Content>
      </Container>
    </>
  );
};
