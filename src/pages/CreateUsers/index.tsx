import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Select } from 'antd';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

import { HiBadgeCheck } from 'react-icons/hi';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { maskPhone } from '../../utils/Masks';
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
  ShowAllTrucksButton,
  TitleRow,
} from './styles';

interface RolesInterface {
  id: string;
  name: string;
}

export const CreateUsers = () => {
  const { data } = useAuth();
  const history = useHistory();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('Selecione...');
  const [roles, setRoles] = useState<RolesInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    async function getRoles() {
      const res = await api.get(`/roles?limit=100000`);
      setRoles(res.data.results);
    }

    getRoles();
  }, []);

  const handleChangeSelection = (value: any) => {
    setUserId(value);
  };

  const validateFormFields = () => {
    if (
      !name.trim() ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      userId === 'Selecione...'
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error('As senhas não conferem!');
      return;
    }

    if (!validateFormFields()) {
      toast.error('Digite todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const usr = {
        individual_person: { name, phone_number: phoneNumber },
        email,
        password,
        password_confirmation: confirmPassword,
        role_id: userId,
      };

      await api.post(`/users`, usr);

      toast.success('Usuário cadastrado com sucesso!');
      setLoading(false);

      setName('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserId(null as any);
    } catch (err) {
      handleError(err);
      setLoading(false);
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

              <Label>
                Telefone
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(maskPhone(e.target.value))}
                  type="text"
                />
              </Label>

              <Label>
                Senha
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  maxLength={16}
                />
              </Label>

              <Label>
                Confirmação de senha
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Label>
            </InfoGroup>

            <InfoGroup className="informations__info-group-second">
              <Label>
                E-mail
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </Label>

              <SelectLabel>
                Função
                <Select
                  placeholder="Selecione...."
                  value={userId}
                  bordered={false}
                  onChange={handleChangeSelection}
                >
                  {roles.map((role) => (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </SelectLabel>

              {/* <Label>
                <Link to="/cadastrar-funcao">
                  <ShowAllTrucksButton className="info-group__register-function">
                    Cadastrar função
                  </ShowAllTrucksButton>
                </Link>
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
          </ButtonsWrapper>
        </Content>
      </Container>
    </>
  );
};
