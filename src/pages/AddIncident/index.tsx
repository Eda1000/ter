import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

export const AddIncident = () => {
  const navigate = useNavigate();

  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [incident, setIncident] = useState<string>('');
  const [isPrevented, setIsPrevented] = useState<boolean | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const delivered = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  const handleDeliveredStatus = (e: any) => {
    const option = e.target.value;
    setIsPrevented(option);
  };

  const handleRegisterIncident = async () => {
    setLoading(true);

    const incidentData = {
      comment: incident,
      is_prevented: isPrevented,
      invoice_number: invoiceNumber,
    };

    try {
      const response = await api.post(`incidents`, incidentData);

      if (response) {
        handleSucces();
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

  const handleSucces = () => {
    toast.success('Incidente cadastrado com sucesso');

    setTimeout(() => {
      navigate('/ocorrencias');
    }, 3000);
  };

  const isDisabled = () => {
    if (invoiceNumber && incident && isPrevented !== null && !loading) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Cadastro de Ocorrências</PageTitle>

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
                <Input onChange={(e) => setInvoiceNumber(e.target.value)} />
              </Label>

              <IncidentLabel>
                Qual foi a ocorrência?
                <Input onChange={(e) => setIncident(e.target.value)} />
              </IncidentLabel>
            </InfoGroup>

            <InfoGroup>
              <DeliveryRadioLabel>
                Essa ocorrência impediu que a entrega fosse realizada?
                <RadioWrapper>
                  <Radio.Group
                    options={delivered}
                    onChange={handleDeliveredStatus}
                  />
                </RadioWrapper>
              </DeliveryRadioLabel>
            </InfoGroup>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              {loading ? (
                <SaveButton disabled={isDisabled()}>
                  <LoadingOutlined /> <div /> Salvando
                </SaveButton>
              ) : (
                <SaveButton
                  disabled={isDisabled()}
                  onClick={() => handleRegisterIncident()}
                >
                  <HiBadgeCheck size={24} />
                  Salvar
                </SaveButton>
              )}

              <Link to="/ocorrencias">
                <BackButton>Voltar</BackButton>
              </Link>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
