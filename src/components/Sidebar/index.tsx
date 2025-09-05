import positionImg from '../../assets/sidebar/position.svg';
import truckImg from '../../assets/sidebar/truck.svg';
import mapsImg from '../../assets/sidebar/maps.svg';
import observationImg from '../../assets/sidebar/observation.svg';
import usersImg from '../../assets/sidebar/users.svg';

import { Container } from './styles';

export const Sidebar = () => {
  return (
    <Container>
      <div>
        <a href="/todas-as-posicoes">
          <img src={positionImg} alt="Ícone posições" />
          <div>Armazém</div>
        </a>
      </div>

      <div>
        <a href="/caminhoes">
          <img src={truckImg} alt="Ícone caminhão" />
          <div>Caminhões</div>
        </a>
      </div>

      {/* <div>
        <a href="/area">
          <img src={mapsImg} alt="Ícone mapa" />
          <div>Coletas</div>
        </a>
      </div> */}

      {/* <div>
        <a href="/status-notas-fiscais">
          <img src={observationImg} alt="Ícone prancheta" />
          <div>Observação NF</div>
        </a>
      </div> */}

      <div>
        <a href="/listar-usuarios">
          <img src={usersImg} alt="Ícone usuários" />
          <div>Usuários</div>
        </a>
      </div>
    </Container>
  );
};
