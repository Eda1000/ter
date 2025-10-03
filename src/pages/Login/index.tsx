import { useState, FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

import logoImg from '../../assets/general/logo.svg';
import truckImg from '../../assets/general/truck.svg';
import backgroundImg from '../../assets/general/background.svg';

import { Container, Form, SideTruck, SaveLogin } from './styles';

import { useAuth } from '../../hooks/Auth';
import axios, { AxiosError } from 'axios';

export interface Geocode {
  results: Result[];
}

export interface Result {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveLogin, setSaveLogin] = useState(false);
  const [response, setResponse] = useState<Result[]>();

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const validateFormFields = () => {
    if (!email.trim() || !password.trim()) {
      return false;
    }
    return true;
  };

  const fetchApiGeocoding = async (val: string) => {
    if (val !== '') {
      val.replace(' ', '+');

      const { data } = await axios.get<Geocode>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${val}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
      );

      setResponse(data.results);
    }
  };

  async function handleLoginSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!validateFormFields()) {
      toast.error('Digite corretamente seu e-mail e senha');
      return;
    }

    try {
      setLoading(true);

      await signIn({
        email,
        password,
        saveLogin,
      });

      setLoading(false);
      toast.success('Seja bem vindo!');
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  }

  const handleError = async (error: any) => {
    let message;
    if (error?.response?.data?.message) {
      message = error?.response?.data.message;
    } else {
      message = error?.toString();
    }

    setLoading(false);
    toast.error(message);
  };

  return (
    <Container>
      <aside>
        <div>
          <header>
            <img src={logoImg} alt="Selad" />
          </header>

          <Form onSubmit={handleLoginSubmit}>
            <div>
              <label>Login</label>
              <input
                type="text"
                name="login"
                placeholder="Insira seu Login"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label>Senha</label>
              <input
                type="password"
                name="password"
                placeholder="Insira sua Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              {loading ? (
                <button type="submit">
                  <LoadingOutlined />
                </button>
              ) : (
                <button type="submit">Entrar</button>
              )}
            </div>

            <SaveLogin>
              <label>
                <input
                  type="checkbox"
                  checked={saveLogin}
                  onChange={() => setSaveLogin(!saveLogin)}
                />
                Salvar login
              </label>

            </SaveLogin>
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
