import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';

import { Sidenav } from './components/Sidenav';

import logoImg from '../../assets/general/logo.svg';
import notesImg from '../../assets/header/notes.svg';
import routeImg from '../../assets/header/route.svg';
import boxImg from '../../assets/header/box.svg';
import receipt_icon from '../../assets/header/receipt_icon.svg';

import { useAuth } from '../../hooks/Auth';

import { Container, MobileHeader } from './styles';

export const Header = () => {
  const { signOut } = useAuth();

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <MobileHeader>
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <HiMenuAlt2></HiMenuAlt2>
        </button>

        <Link to="/">
          <img src={logoImg} alt="Logo SELAD" />
        </Link>
      </MobileHeader>

      <Container>
        <Link to="/">
          <img src={logoImg} alt="Logo SELAD" />
        </Link>

        <div>
          <img src={notesImg} alt="Ícone notas fiscais" />
          <Link to="/">Notas fiscais</Link>
        </div>

        <div>
          <img src={routeImg} alt="Ícone roteiros" />
          <Link to="/roteirizacao">Roteirização</Link>
        </div>

        {/* <div>
          <img src={loadingImg} alt="Ícone carregamento" />
          <Link to="/carregamentos">Carregamento</Link>
        </div> */}

        <div>
          <img src={boxImg} alt="Ícone caixa" />
          <Link to="/todas-as-caixas">Caixas</Link>
        </div>

        <div>
          <img src={receipt_icon} alt="Ícone comprovante" />
          <Link to="/comprovantes">Comprovantes</Link>
        </div>

        {/* <div>
          <img src={megaphone_icon} alt="Ícone caixa" />
          <Link to="/ocorrencias">Ocorrências</Link>
        </div> */}

        {/* <div>
          <img src={alert_icon} alt="Ícone caixa" />
          <Link to="/alertas">Alertas</Link>
        </div> */}

        <div onClick={() => signOut()}>
          <a href="">Sair</a>
        </div>
      </Container>

      <Sidenav isActive={isActive} />
    </>
  );
};
