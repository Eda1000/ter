import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { HiBadgeCheck } from 'react-icons/hi';
import { useAuth } from '../../hooks/Auth';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import api from '../../services/api';
import { LoadingOutlined } from '@ant-design/icons';
import {
  ButtonsWrapper,
  Container,
  FormContent,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  SaveButton,
  SeeAllPositionsButton,
  TitleRow,
} from './styles';
import { Swicth } from '../RouteScripting/components/RouteringDragAndDrop/_routeringDragAndDrop';
import { BackButton, DeleteButton } from '../EditTruck/styles';

interface PositionDataInterface {
  state: {
    id: string;
    position: string;
    multiple: boolean;
    release_position: boolean;
    user_id: string;
    user: User;
    collection_orders: CollectionOrder[];
    created_at: string;
    updated_at: string;
  };
}

export interface User {
  id: string;
  email: string;
  password: string;
  avatar: string;
  role_id: string;
  individual_person: IndividualPerson;
  created_at: string;
  updated_at: string;
}

export interface IndividualPerson {
  id: string;
  name: string;
  phone_number: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CollectionOrder {
  id: string;
  collection_information_id: string;
  invoice: Invoice;
}

export interface Invoice {
  invoice_number: string;
  order_number: string;
  position_occupied: boolean;
  created_at: string;
}

export const EditPosition = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const positionData = location.state as PositionDataInterface;

  const [position, setPosition] = useState(positionData.state.position);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [multiple, setMultiple] = useState(positionData.state.multiple);

  const validateFormFields = () => {
    if (!position.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateFormFields()) {
      toast.error('Digite uma posição!');
      return;
    }

    setLoading(true);
    try {
      const usr = {
        position,
        multiple,
      };

      const headers = { Authorization: `Bearer ${data.access_token}` };
      await api.put(`/positions/${positionData.state.id || ''}`, usr, {
        headers,
      });

      toast.success('Posição alterada com sucesso!');

      navigate('/todas-as-posicoes')
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);

    try {
      await api.delete(`/positions/${positionData.state.id || ''}`);

      toast.success('Posição deletada com sucesso!');

      navigate('/todas-as-posicoes')
    } catch (err) {
      handleError(err);
    } finally {
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
        <FormContent onSubmit={(event) => handleSubmit(event)}>
          <TitleRow>

            <PageTitle>Adicionar posições</PageTitle>

            <SeeAllPositionsButton type="button" onClick={() => navigate("/todas-as-posicoes")}>
              Ver todas as posições
            </SeeAllPositionsButton>


          </TitleRow>
          <TitleRow>
            <Swicth>
              <input
                type="checkbox"
                id="switch"
                checked={multiple}
                onClick={() => setMultiple(!multiple)}
              />
              <label htmlFor="switch">Toggle</label>
              <span>Multiplas posições</span>
            </Swicth>
          </TitleRow>

          <Informations>
            <InfoGroup>
              <Label>
                Posição
                <Input
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                  type="text"
                />
              </Label>
            </InfoGroup>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              <SaveButton type="submit" disabled={loading}>
                {!loading ? (
                  <>
                    <HiBadgeCheck size={24} />
                    Alterar posição
                  </>
                ) : (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              </SaveButton>
              <BackButton onClick={() => navigate('/todas-as-posicoes')}>
                Voltar
              </BackButton>
            </MainButtons>

            <DeleteButton onClick={() => handleDelete()}>
              {!loadingDelete ? (
                <>Excluir</>
              ) : (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              )}
            </DeleteButton>
          </ButtonsWrapper>
        </FormContent>
      </Container>
    </>
  );
};
