import { useHistory } from "react-router-dom";

import logoImg from '../../assets/general/logo.svg';
import truckImg from '../../assets/general/truck.svg';
import backgroundImg from '../../assets/general/background.svg';

import { Container, Form, SideTruck } from './styles';

export const ForgotPassword = () => {
  const history = useHistory();

  function handleLoginSubmit() {
    history.push("/entrar");
  }

  return (
    <Container>
      <aside>
        <div>
          <header>
            <img src={logoImg} alt="Selad"/>
          </header>

          <Form onSubmit={handleLoginSubmit}>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="login"
                placeholder="Digite o email para recuperação"
              />
            </div>
          </Form>

          <footer>
            Novo aqui?<a href="/cadastro">Faça seu Cadastro</a>
          </footer>
        </div>
      </aside>

      <SideTruck
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <img src={truckImg} alt="Caminhão Selad"/>
      </SideTruck>
    </Container>
  );
};
