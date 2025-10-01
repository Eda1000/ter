import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { Pagination } from 'antd';
import { toast } from 'react-toastify';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import add_icon from '../../assets/general/plus_icon.svg';
import magnifying_icon from '../../assets/general/magnifying_icon.svg';
import { Spinner } from '../../components/Spinner/Spinner';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Content,
  NewTruckButton,
  PageTitle,
  SearchBox,
  SearchBoxContainer,
  Table,
  TableWrapper,
  TitleRow,
} from './styles';

interface TrucksInterface {
  id: string;
  name: string;
  plate: string;
  capacity: string;
  is_available: string;
  user_id: string;
  created_at: string;
}

interface TrucksApiResponse {
  results: TrucksInterface[];
  page: number;
  total: number;
}

export const ListTrucks = () => {
  const { data } = useAuth();
  const history = useHistory();

  const [trucks, setTrucks] = useState<TrucksInterface[]>([]);
  const [truckSearch, setTruckSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    getTrucks();
  }, []);

  async function getTrucks() {
    setLoading(true);

    try {
      const res = await api.get<TrucksApiResponse>(`/trucks?page=${page}&limit=10`);

      setTrucks(res.data.results);
      setPage(res.data.page);
      setTotal(res.data.total);
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  }

  const searchTrucks = async () => {
    if (truckSearch.trim() !== '') {
      const res = await api.get<TrucksApiResponse>(`/trucks?page=${page}&q=${truckSearch}`);
      setTrucks(res.data.results);
    } else {
      const res = await api.get<TrucksApiResponse>(`/trucks?page=${page}&limit=10`);
      setTrucks(res.data.results);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      searchTrucks();
    }
  };

  async function handleChangePage(e: number) {
    const res = await api.get<TrucksApiResponse>(`/trucks?page=${e}&limit=10`);

    setTrucks(res.data.results);
  }

  function getFormattedDate(date: any) {
    const newDate = format(new Date(date), "dd/MM/yyyy 'às' HH:mm");
    return newDate;
  }

  const handleError = async (error: any) => {
    let message;
    if (error.response.data?.message) {
      message = error.response?.data.message;
    } else {
      message = error.toString();
    }

    setLoading(false);
    toast.error(message);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Caminhões</PageTitle>
            <Link to="/cadastrar-caminhao">
              <NewTruckButton>
                <img src={add_icon} alt="ícone de adicionar" />
                <span>Novo</span>
              </NewTruckButton>
            </Link>
            <SearchBoxContainer>
              <SearchBox
                onChange={(e) => setTruckSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar..."
              />
              <img
                onClick={() => searchTrucks()}
                style={{ cursor: 'pointer' }}
                src={magnifying_icon}
                alt="ícone de procurar"
              />
            </SearchBoxContainer>
          </TitleRow>
          <TableWrapper>
            <Table>
              {!loading ? (
                <>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Placa</th>
                      <th>Capacidade(m³)</th>
                      <th>Registro</th>
                      <th>Disponível</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trucks.map((truck) => (
                      <tr
                        className="columns"
                        onClick={() =>
                          history.push('/editar-caminhao', {
                            state: truck,
                          })
                        }
                        key={truck.id}
                      >
                        <td data-label="Nome">{truck.name}</td>
                        <td data-label="Placa">{truck.plate}</td>
                        <td data-label="Capacidade(m³)">{truck.capacity}</td>
                        <td data-label="Registro">
                          {getFormattedDate(truck.created_at)}
                        </td>
                        <td data-label="Disponível">Sim</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <div style={{ margin: '60px 0 60px 0' }}>
                  <Spinner />
                </div>
              )}
            </Table>
            {!loading ? (
              <div style={{ padding: '20px 0 20px 0' }}>
                <Pagination
                  defaultCurrent={page}
                  total={total}
                  onChange={(e) => handleChangePage(e)}
                />
              </div>
            ) : (
              ''
            )}
          </TableWrapper>
        </Content>
      </Container>
    </>
  );
};
