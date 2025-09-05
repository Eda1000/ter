import { Link } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { FaTelegramPlane } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';

import orderBackgroundImg from '../../assets/order/orderBackground.svg';

import { Container, Content, FormContainer, BackgroundImg } from './styles';

export const Order = () => {
  return (
    <>
      <Header />
      <Sidebar />

      <Container >

        <Content>
          <h1>Olá, Operador!</h1>

          <FormContainer>
            <Link to="/">
              <button type="submit">
                <FaTelegramPlane />
                Enviar XML
              </button>
            </Link>

            <Link to="/pedido/cadastro-manual">
              <button type="submit">
                <HiPlusCircle />
                Criar Manualmente
              </button>
            </Link>
          </FormContainer>
        </Content>
      </Container>

      <BackgroundImg style={{backgroundImage: `url(${orderBackgroundImg})`}} />
    </>
  );
};
