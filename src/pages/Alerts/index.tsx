import { useState, useEffect } from 'react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import clock_icon from '../../assets/general/clock_icon.svg';
import pin_icon from '../../assets/general/pin_icon.svg';
import paper_icon from '../../assets/general/paper_icon.svg';

import {
  AlertContainer,
  AlertTitle,
  Container,
  Content,
  Customer,
  EstimatedArrival,
  AlertsWrapper,
  CurrentLocation,
  PageTitle,
  RouteTag,
  ShowAllStatusButton,
  TitleRow,
  Details,
  Invoice,
  TimeCounter,
  NoAlertFeedBack,
} from './styles';

import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/Auth';

import api from '../../services/api';

import { EnsureToCurrentDate } from './helpers/ensureToCurrentDate';
import { EnsureMissingDays } from './helpers/ensureMissingDays';

interface IAlertData {
  address: string;
  created_at: string;
  route: string;
  posted: string;
  id: string;
  invoice_id: string;
  invoice_number: string;
  message: string;
  new_delivery_time: string;
  viewed: boolean;
  invoice: {
    client_name: string;
    delivery_order: number;
  };
}

export const Alerts = () => {
  const { data } = useAuth();

  const [alertData, setAlertData] = useState([] as Array<IAlertData>)
  const [hasAlert, setHasAlert] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleClearList = () => {
    setIsLoaded(false)

    if(!hasAlert) {
      return setIsLoaded(true)
    }

    api.patch('delay-incidents',{
      headers:{
        Authorization: `Bearer ${data.access_token}`
      }
    }).then((response) => {
      toast.success("Alertas excluídos com sucesso!")
    }).catch((err) => {
      toast.error(err.response?.data?.message || err.toString())
    })

    setHasAlert(false)

    return setIsLoaded(true)
  }

  const listAlertsFromAPI = () => {
    api.get('delay-incidents?viewed=false',{
      headers:{
        Authorization: `Bearer ${data.access_token}`
      }
    }).then((response) => {

      setAlertData(response.data.results)

      setAlertData(prevState => (
        prevState.map((state) => ({
            ...state,
            new_delivery_time: EnsureMissingDays(state.new_delivery_time, state.created_at),
            posted: EnsureToCurrentDate(state.created_at),
          }))))

      setHasAlert(response.data.results.length === 0 ? false : true)
    }).catch((err) => {
      toast.error(err.response?.data?.message || err.toString())
    })
  }

  useEffect(() => {
    listAlertsFromAPI()
  },[])

  const renderAlerts = () => {
    if (hasAlert) {
      return (
        <AlertsWrapper>

          {alertData.map(alertData => (
            <AlertContainer key={alertData.id}>
            <AlertTitle>{alertData.message}</AlertTitle>
            <RouteTag route={`${alertData.invoice.delivery_order}`}>
              Rota {alertData.invoice.delivery_order}
            </RouteTag>
            <Customer>{alertData.invoice.client_name}</Customer>

            <Details>
              <Invoice>
                <img src={paper_icon} alt="ícone de uma folha de papel" />
                <b>Número NF: </b> {alertData.invoice_number}
              </Invoice>
              <CurrentLocation>
                <img src={pin_icon} alt="ícone de um pin de localização" />
                {alertData.address}
              </CurrentLocation>
              <EstimatedArrival>
                <img src={clock_icon} alt="ícone de um relógio" />
                Novo Horário de chegada previsto: {alertData.new_delivery_time}
              </EstimatedArrival>
            </Details>

            <TimeCounter>{alertData.posted}</TimeCounter>
          </AlertContainer>
          ))}

        </AlertsWrapper>
      );
    } else {
      return <NoAlertFeedBack>Nenhum alerta encontrado ainda</NoAlertFeedBack>;
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Alertas</PageTitle>
            <ShowAllStatusButton
              onClick={handleClearList}
              disabled={!isLoaded}
            >
              Limpar alertas
            </ShowAllStatusButton>
          </TitleRow>
          {renderAlerts()}
        </Content>
      </Container>
      ;
    </>
  );
};
