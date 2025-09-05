import { Link } from 'react-router-dom';

import { RiLogoutBoxRFill } from 'react-icons/ri';

import notesImg from '../../../../assets/header/notes.svg';
import routeImg from '../../../../assets/header/route.svg';
import boxImg from '../../../../assets/header/box.svg';

import receipt_icon from '../../../../assets/header/receipt_icon.svg';
import megaphone_icon from '../../../../assets/header/megaphone_icon.svg';

import { useAuth } from '../../../../hooks/Auth';

import { Container } from './styles';

interface SidenavProps {
  isActive: boolean;
}

export const Sidenav = ({ isActive }: SidenavProps) => {
  const { signOut } = useAuth();

  return (
    <Container isActive={isActive}>
      <div>
        <img src={notesImg} alt="Ícone notas fiscais" />
        <Link to="/home">Notas fiscais</Link>
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

      <div>
        <img src={megaphone_icon} alt="Ícone caixa" />
        <Link to="/ocorrencias">Ocorrências</Link>
      </div>

      <div onClick={() => signOut()}>
        <RiLogoutBoxRFill />
        <Link to="/">Sair</Link>
      </div>
    </Container>
  );
};
