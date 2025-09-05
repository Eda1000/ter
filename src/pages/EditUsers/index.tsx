import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Select } from 'antd';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

import { HiBadgeCheck } from 'react-icons/hi';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
  BackButton,
  ButtonsWrapper,
  Container,
  Content,
  DeleteButton,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  RadioWrapper,
  SaveButton,
  SelectLabel,
  ShowAllTrucksButton,
  TitleRow,
} from './styles';

interface UserDataInterface {
  state: {
    id: string;
    individual_person: { name: string };
    email: string;
    role_id: string;
  };
}

interface RolesInterface {
  id: string;
  name: string;
}

export const EditUsers = () => {
  const { data } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const userData = location.state as UserDataInterface;

  const [name, setName] = useState(userData?.state?.individual_person?.name);
  const [email, setEmail] = useState(userData.state.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [userId, setUserId] = useState(userData.state.role_id);
  const [roles, setRoles] = useState<RolesInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    async function getRoles() {
      const headers = { Authorization: `Bearer ${data.access_token}` };
      const res = await api.get(`/roles?limit=100000`, {
        headers,
      });
      setRoles(res.data.results);
    }

    getRoles();
  }, []);

  const handleChangeSelection = (value: any) => {
    setUserId(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const usr = {
        name,
        email,
        password: String(password).trim() !== ''
          ? String(password).trim()
          : undefined,
        password_confirmation: String(password).trim() !== ''
          ? String(password).trim()
          : undefined,
        old_password: String(oldPassword).trim() !== ''
          ? String(oldPassword).trim()
          : undefined,
        role_id: undefined,
      };

      const headers = { Authorization: `Bearer ${data.access_token}` };
      await api.put(`/users/${userData.state.id}`, usr, {
        headers,
      });

      toast.success('Usuário editado com sucesso!');
      setLoading(false);

      setPassword('');
      setOldPassword('');
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoadingDelete(true);
    try {
      await api.delete(`/users/${userData.state.id}`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      setLoadingDelete(false);
      toast.success('Usuário removido!');
      history.push('/listar-usuarios');
    } catch (err) {
      handleError(err);
      setLoadingDelete(false);
    }
  };

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
            <PageTitle>Cadastrar Usuários</PageTitle>
            <Link to="/listar-usuarios">
              <ShowAllTrucksButton>Ver todos os usuários</ShowAllTrucksButton>
            </Link>
          </TitleRow>
          <Informations>
            <InfoGroup>
              <Label>
                Nome
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Label>
              <SelectLabel>
                Função
                <Select
                  placeholder="Selecione...."
                  value={userId}
                  bordered={false}
                  onChange={handleChangeSelection}
                  disabled
                >
                  {roles.map((role) => (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </SelectLabel>
              <Label>
                Senha
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  maxLength={16}
                />
              </Label>
            </InfoGroup>
            <InfoGroup>
              <Label>
                E-mail
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </Label>
              <Label></Label>
              <Label>
                Senha antiga
                <Input
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="text"
                  maxLength={16}
                />
              </Label>
              {/* <Label>
                Confirmação de senha
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Label> */}
            </InfoGroup>
          </Informations>
          <ButtonsWrapper>
            <MainButtons>
              <SaveButton onClick={() => handleSubmit()}>
                {!loading ? (
                  <>
                    <HiBadgeCheck size={24} />
                    Salvar Usuário
                  </>
                ) : (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              </SaveButton>
              <BackButton onClick={() => history.push('/listar-usuarios')}>
                Voltar
              </BackButton>
            </MainButtons>
            <DeleteButton onClick={() => deleteUser()}>
              {!loadingDelete ? (
                <>Excluir</>
              ) : (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              )}
            </DeleteButton>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
