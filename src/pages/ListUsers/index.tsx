import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  NewUsersButton,
  PageTitle,
  SearchBox,
  SearchBoxContainer,
  Table,
  TableWrapper,
  TitleRow,
} from './styles';

interface UsersInterface {
  id: string;
  email: string;
  role: {
    name: string;
  };
  individual_person: {
    name: string;
  };
}

interface UsersApiResponse {
  results: UsersInterface[];
  page: number;
  total: number;
}

export const ListUsers = () => {
  const { data } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [usersSearch, setUsersSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    setLoading(true);

    api.get<UsersApiResponse>(`/users?page=${page}&limit=10`,{
      headers:{
        Authorization: `Bearer ${data.access_token}`
      }
    }).then(response => {
      setUsers(response.data.results);
      setPage(response.data.page);

      setTotal(response.data.total);
    }).catch(err => {
      handleError(err);

    }).finally(() => {

      setLoading(false);
    })
  }, []);

  const searchUsers = async () => {
    const headers = { Authorization: `Bearer ${data.access_token}` };
    if (usersSearch.trim() !== '') {
      const res = await api.get<UsersApiResponse>(`/users?page=${page}&name=${usersSearch}`, {
        headers,
      });
      setUsers(res.data.results);
    } else {
      const res = await api.get<UsersApiResponse>(`/users?page=${page}&limit=10`, {
        headers,
      });
      setUsers(res.data.results);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      searchUsers();
    }
  };

  async function handleChangePage(e: number) {
    const headers = { Authorization: `Bearer ${data.access_token}` };
    const res = await api.get<UsersApiResponse>(`/users?page=${e}&limit=10`, {
      headers,
    });

    setUsers(res.data.results);
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
            <PageTitle>Usuários</PageTitle>
            <Link to="/adicionar-usuario">
              <NewUsersButton>
                <img src={add_icon} alt="ícone de adicionar" />
                <span>Novo</span>
              </NewUsersButton>
            </Link>
            <SearchBoxContainer>
              <SearchBox
                onChange={(e) => setUsersSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar..."
              />
              <img
                onClick={() => searchUsers()}
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
                      <th>Email</th>
                      <th>Função</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((users) => (
                      <tr
                        className="columns"
                        onClick={() =>
                          navigate('/editar-usuarios', {
                            state: users,
                          })
                        }
                        key={users.id}
                      >
                        <td>{users.individual_person?.name}</td>
                        <td>{users.email}</td>
                        <td>{users.role?.name}</td>
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
              <div
                style={{
                  display: 'table',
                  margin: '0 auto',
                  padding: '20px 0 20px 0',
                }}
              >
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
