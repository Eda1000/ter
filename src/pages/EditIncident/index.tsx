import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Radio } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { HiBadgeCheck } from 'react-icons/hi';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
  BackButton,
  ButtonsWrapper,
  Container,
  Content,
  DeleteButton,
  DeliveryRadioLabel,
  IncidentLabel,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  RadioWrapper,
  SaveButton,
  ShowAllIncidentsButton,
  TitleRow,
} from './styles';

export const EditIncident = () => {
  const { incidentID } = useParams<{ incidentID: string }>();
  const navigate = useNavigate();

  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [incidentDescription, setIncidentDescription] = useState<string>('');
  const [isPrevented, setIsPrevented] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const delivered = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  useEffect(() => {
    fetchIncident();
  }, []);

  const fetchIncident = async () => {
    setLoading(true);
    try {
      const response = await api.get(`incidents/${incidentID}`);

      if (response) {
        setInvoiceNumber(response.data.invoice_number);
        setIncidentDescription(response.data.comment);
        setIsPrevented(response.data.is_prevented);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveredStatus = (e: any) => {
    const option = e.target.value;
    setIsPrevented(option);
  };

  const isDisabled = () => {
    if (
      invoiceNumber !== '' &&
      incidentDescription !== '' &&
      isPrevented !== null &&
      !loading
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleEditIncident = async () => {
    setLoading(true);

    const editedData = {
      comment: incidentDescription,
      is_prevented: isPrevented,
      invoice_number: invoiceNumber,
    };

    try {
      const response = await api.put(`incidents/${incidentID}`, editedData);

      if (response) {
        handleSucces('alterações salvas com sucesso');
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const handleSucces = (message: string) => {
    toast.success(message);

    setTimeout(() => {
      navigate('/ocorrencias');
    }, 3000);
  };

  const handleDeleteIncident = async () => {
    setLoading(true);

    try {
      const response = await api.delete(`incidents/${incidentID}`);

      if (response) {
        handleSucces('Incidente deletado com sucesso');
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Editar ocorrência</PageTitle>

            <Link to="/ocorrencias">
              <ShowAllIncidentsButton>
                Ver todas as ocorrências
              </ShowAllIncidentsButton>
            </Link>
          </TitleRow>
          <Informations>
            <InfoGroup>
              <Label>
                Informe o nº da Nota Fiscal
                <Input
                  defaultValue={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </Label>

              <IncidentLabel>
                Qual foi a ocorrência?
                <Input
                  defaultValue={incidentDescription}
                  onChange={(e) => setIncidentDescription(e.target.value)}
                />
              </IncidentLabel>
            </InfoGroup>

            <InfoGroup>
              <DeliveryRadioLabel>
                Essa ocorrência impediu que a entrega fosse realizada?
                <RadioWrapper>
                  <Radio.Group
                    options={delivered}
                    onChange={handleDeliveredStatus}
                    value={isPrevented}
                  />
                </RadioWrapper>
              </DeliveryRadioLabel>
            </InfoGroup>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              {loading ? (
                <SaveButton disabled>
                  <LoadingOutlined /> <div /> Salvando
                </SaveButton>
              ) : (
                <SaveButton
                  disabled={isDisabled()}
                  onClick={() => handleEditIncident()}
                >
                  <HiBadgeCheck size={24} />
                  Salvar
                </SaveButton>
              )}

              <Link to="/ocorrencias">
                <BackButton>Voltar</BackButton>
              </Link>
            </MainButtons>

            <DeleteButton
              disabled={loading}
              onClick={() => handleDeleteIncident()}
            >
              {loading ? <LoadingOutlined /> : 'Excluir'}
            </DeleteButton>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
