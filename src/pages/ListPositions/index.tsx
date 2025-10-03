/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Spinner } from '../../components/Spinner/Spinner';
import { Pagination } from 'antd';

import api from '../../services/api';

import add_icon from '../../assets/general/plus_icon.svg';
import magnifying_icon from '../../assets/general/magnifying_icon.svg';

import {
  Container,
  Content,
  PositionButton,
  PageTitle,
  SearchBox,
  SearchBoxContainer,
  Table,
  TableWrapper,
  TitleRow,
  Select,
} from './styles';
import { PaginationContainer } from '../../components/PaginationContainer';
import { Positions, PositionsResult } from './interface';

export interface InvoicePosition {
  id: string;
  invoice_id: string;
  position_id: string;
  is_occupied: boolean;
  position: Position;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: string;
  position: string;
  release_position: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const ListPositions = () => {
  const [positions, setPositions] = useState<Positions[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(5);
  const [searchPositions, setSearchPositions] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [total, setTotal] = useState<number>(0);

  const [available, setAvailable] = useState<boolean | undefined>();

  useEffect(() => {
    getPositions();
  }, [currentPage, available, currentSize]);

  const getPositions = async () => {
    setLoading(true);

    try {
      const { data } = await api.get<PositionsResult>('/positions', {
        params: {
          page: currentPage,
          limit: currentSize,
          available: available,
          position: searchPositions || undefined,
        }
      });

      setPositions(data.results);
      setTotal(data.total);
    } catch (error: any) {
      handleError(error.response.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err: string) => {
    toast.error(err);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      getPositions();
    }
  };

  const PaginationData = () => {
    return (
      <PaginationContainer>
        <Pagination
          defaultCurrent={currentPage}
          total={total}
          pageSize={currentSize}
          onChange={(e: number) => setCurrentPage(e === 0 ? 1 : e)}
          hideOnSinglePage
          onShowSizeChange={(current, size) => {
            setCurrentPage(current === 0 ? 1 : current);
            setCurrentSize(size);
          }}
        />
      </PaginationContainer>
    );
  };

  const handleFilter = async (e: string) => {
    if (e === 'true') {
      return setAvailable(false);
    } else if (e === 'false') {
      return setAvailable(true);
    }

    return setAvailable(undefined);
  }

  return (
    <>
      <Header />

      <Sidebar />

      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Armazém</PageTitle>

            <SearchBoxContainer style={{ maxWidth: '300px' }}>
              <Select onChange={(e) => handleFilter(e.target.value)}>
                <option value="all">Todas as Posições</option>
                <option value={'true'}>Posições em Uso</option>
                <option value={'false'}>Posições não Usadas</option>
              </Select>
            </SearchBoxContainer>

            <SearchBoxContainer>
              <SearchBox
                placeholder="Buscar posições"
                value={searchPositions}
                onChange={(e) => setSearchPositions(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <img
                src={magnifying_icon}
                alt="ícone de procurar"
                onClick={() => getPositions()}
              />
            </SearchBoxContainer>
          </TitleRow>

          <TitleRow>
            <Link to="/adicionar-posicoes">
              <PositionButton>
                <img src={add_icon} alt="ícone de adicionar" />
                <span>Nova posição</span>
              </PositionButton>
            </Link>
          </TitleRow>

          <TableWrapper>
            <Table>
              {!loading ? (
                <>
                  <thead>
                    <tr>
                      <th>Nota Fiscal</th>

                      <th>Pedido</th>

                      <th>Data</th>

                      <th>Usuário</th>

                      <th>Posições</th>
                    </tr>
                  </thead>

                  <tbody>
                    {positions &&
                      positions.map(
                        (item) => (
                          <tr key={item.id} className="columns" onClick={() =>
                            navigate('/editar-posicao', {
                              state: item,
                            })
                          }
                          >
                            <td data-label="Nota Fiscal">
                              {(item.collection_orders[0] && item.collection_orders[0].invoice) ? item.collection_orders[0].invoice.invoice_number : ''}
                            </td>

                            <td data-label="Data">
                              {(item.collection_orders[0] && item.collection_orders[0].invoice) ? item.collection_orders[0].invoice.order_number : ''}
                            </td>

                            <td data-label="Data">
                              {item.created_at && new Date(item.created_at).toLocaleDateString()}
                            </td>

                            <td data-label="Usuário">
                              {item.user?.individual_person?.name || ''}
                            </td>

                            <td data-label="Posições">
                              {item.position || ''}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </>
              ) : (
                <div style={{ margin: '60px 0 60px 0' }}>
                  <Spinner />
                </div>
              )}
            </Table>
            {PaginationData()}
          </TableWrapper>
        </Content>
      </Container>
    </>
  );
};
