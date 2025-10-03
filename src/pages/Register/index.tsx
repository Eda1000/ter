import { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import logoImg from '../../assets/general/logo.svg';
import truckImg from '../../assets/general/truck.svg';
import backgroundImg from '../../assets/general/background.svg';

import {
  Container,
  Form,
  SideTruck,
  InputWrapper,
  Label,
  SubmitButton,
} from './styles';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { SelectRoles } from '../../components/SelectRoles';

import { useAuth } from '../../hooks/Auth';
import { toast } from 'react-toastify';
import { emailValidation } from '../../utils/Validations';

type rolesItens = {
  id: string;
  name: string;
};

type rolesProps = {
  results: rolesItens[];
};

export const Register = () => {
  const { data } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [roleId, setRoleId] = useState('');
  const [loading, setLoading] = useState(false);

  const [roles, setRoles] = useState<rolesProps>();

  const navigate = useNavigate();
  const { state } = useLocation();

  if (state === '') {
    navigate('/');
  }

  const validateFormFiels = () => {
    if (!emailValidation(email)) {
      toast.error('Preencha seu e-mail corretamente');
      return false;
    }

    if (!password.trim()) {
      toast.error('Preencha sua senha corretamente');
      return false;
    }

    if (!passwordConfirmation.trim()) {
      toast.error('Preencha sua confirmação de senha corretamente');
      return false;
    }

    if (password !== passwordConfirmation) {
      toast.error('As senhas não combinam');
      return false;
    }

    if (roleId === '') {
      toast.error('Selecione uma função');
      return false;
    }

    if (name === '') {
      toast.error('Preencha seu nome');
      return false;
    }

    return true;
  };

  async function handleRegisterSubmit(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (validateFormFiels()) {
      try {
        setLoading(true);
        await api.post(
          '/users',
          {
            email,
            password,
            password_confirmation: passwordConfirmation,
            individual_person: { name },
            role_id: roleId,
          },
          {
            headers: {
              Authorization: 'Bearer ' + data.access_token,
            },
          },
        );
        setLoading(false);
        navigate('/');
        toast.success('Usuário Cadastrado');
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.toString());
      }
    }
  }

  useEffect(() => {
    const fetchRoles = async () => {
      const { data } = await api.get('roles', {
        headers: {
          Authorization: 'Bearer ' + state,
        },
      });
      setRoles(data);
    };
    fetchRoles();
  }, []);

  return (
    <Container>
      <aside>
        <div>
          <header>
            <img src={logoImg} alt="Selad" />
          </header>

          <Form onSubmit={handleRegisterSubmit}>
            <InputWrapper>
              <Label>Nome</Label>
              <input
                name="name"
                placeholder="Insira seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputWrapper>
            <div>
              <Label>Qual é a sua função?</Label>
              {roles && (
                <SelectRoles
                  data={roles.results}
                  placeholder="Selecione sua função"
                  value={roleId}
                  onChange={(value) => setRoleId(value)}
                />
              )}
            </div>
            <InputWrapper>
              <Label>E-mail</Label>
              <input
                name="email"
                value={email}
                placeholder="Insira seu E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <Label>Senha</Label>
              <input
                name="password"
                type="password"
                value={password}
                placeholder="Insira sua Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <Label>Confirmar Senha</Label>
              <input
                name="password"
                type="password"
                value={passwordConfirmation}
                placeholder="Confirme sua Senha"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <SubmitButton type="submit">
                {loading ? (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                ) : (
                  'Finalizar Cadastrar'
                )}
              </SubmitButton>
            </InputWrapper>
          </Form>
        </div>
      </aside>

      <SideTruck
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <img src={truckImg} alt="Caminhão Selad" />
      </SideTruck>
    </Container>
  );
};
