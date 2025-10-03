import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select } from 'antd';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { FaTrash } from 'react-icons/fa';

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
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  SaveButton,
  SelectLabel,
  TitleRow,
  RegisteredRoles,
} from './styles';

interface RolesInterface {
  id: string;
  name: string;
}

interface PermissionsInterface {
  id: string;
  name: string;
  display_name: string;
}

export const CreateRoles = () => {
  const { data } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [roles, setRoles] = useState<RolesInterface[]>([]);
  const [permissions, setPermissions] = useState<PermissionsInterface[]>([]);
  const [permissionId, setPermissionId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    async function getPermissions() {
      const headers = { Authorization: `Bearer ${data.access_token}` };
      const res = await api.get(`/permissions`, {
        headers,
      });
      setPermissions(res.data.results);
    }

    getPermissions();
  }, []);

  useEffect(() => {
    async function getRoles() {
      const headers = { Authorization: `Bearer ${data.access_token}` };
      const res = await api.get(`/roles?limit=100000`, {
        headers,
      });
      setRoles(res.data.results);
    }

    getRoles();
  }, [loading, loadingRemove]);

  const handleChangeSelection = (value: any) => {
    setPermissionId(value);
  };

  const validateFormFields = () => {
    if (!name.trim() || permissionId.length === 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFormFields()) {
      toast.error('Digite todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const usr = {
        name,
        permissions_ids: permissionId,
      };

      const headers = { Authorization: `Bearer ${data.access_token}` };
      await api.post(`/roles`, usr, {
        headers,
      });

      toast.success('Função cadastrada com sucesso!');
      setLoading(false);

      setName('');
      setPermissionId([] as any);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  async function handleDeleteRole(id: string) {
    setLoadingRemove(true);
    try {
      await api.delete(`/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      setLoadingRemove(false);
      toast.success('Função removida!');
    } catch (err) {
      handleError(err);
      setLoadingRemove(false);
    }
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
            <PageTitle>Cadastrar Funções</PageTitle>
          </TitleRow>
          <Informations>
            <InfoGroup>
              <Label>
                Nome
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Label>
              <SelectLabel>
                Permissão
                <Select
                  placeholder="Selecione...."
                  value={permissionId}
                  bordered={false}
                  onChange={handleChangeSelection}
                  mode="multiple"
                  allowClear
                >
                  {permissions.map((permission) => (
                    <Option key={permission.id} value={permission.id}>
                      {permission.display_name}
                    </Option>
                  ))}
                </Select>
              </SelectLabel>
            </InfoGroup>
            <InfoGroup>
              <Label>Funções cadastradas</Label>
              <RegisteredRoles>
                {roles.map((role) => (
                  <div key={role.id}>
                    <p>{role.name}</p>
                    <FaTrash onClick={() => handleDeleteRole(role.id)} />
                  </div>
                ))}
              </RegisteredRoles>
            </InfoGroup>
          </Informations>
          <ButtonsWrapper>
            <MainButtons>
              <SaveButton onClick={() => handleSubmit()}>
                {!loading ? (
                  <>
                    <HiBadgeCheck size={24} />
                    Salvar função
                  </>
                ) : (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              </SaveButton>

              <BackButton onClick={() => navigate('/adicionar-usuario')}>
                Voltar
              </BackButton>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
