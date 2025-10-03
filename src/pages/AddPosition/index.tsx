import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { HiBadgeCheck } from 'react-icons/hi';
import { useAuth } from '../../hooks/Auth';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import api from '../../services/api';

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

export const AddPosition = () => {
  const { data } = useAuth();
  const navigate = useNavigate();

  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);

  const [multiple, setMultiple] = useState(false);

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
      await api.post(`/positions`, usr, {
        headers,
      });

      toast.success('Posição cadastrada com sucesso!');

      setPosition('');
    } catch (err) {
      handleError(err);
    } finally {
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
                <HiBadgeCheck size={24} />
                Salvar posição
              </SaveButton>
            </MainButtons>
          </ButtonsWrapper>
        </FormContent>
      </Container>
    </>
  );
};
