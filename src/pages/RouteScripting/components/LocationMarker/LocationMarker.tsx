/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import boxImg from '../../../../assets/icons/box.png';
import clockImg from '../../../../assets/icons/clock.png';
import fileImg from '../../../../assets/icons/file.png';
import markImg from '../../../../assets/icons/mark.png';
import timeImg from '../../../../assets/icons/time.png';
import seladHorse from '../../../../assets/map/seladHorse.png';

import {
  MarkerWrapper,
  Marker,
  Number,
  Info,
  HorseIcon,
  ButtonRadius,
  Input,
  InfoWrapper,
} from './_locationMarker';

import { Invoice } from '../../../../Interfaces/RouteScripitingInterface';
import { FaEdit, FaSave } from 'react-icons/fa';
import { maskCep } from '../../../../utils/Masks';
import api from '../../../../services/api';
import { toast } from 'react-toastify';
import {
  IoArrowBackCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';
import axios from 'axios';
interface MarkerProps {
  lat?: number;
  lng?: number;
  color?: string;
  order?: number | string;
  invoiceInfo: Invoice;
  seladBase?: boolean;
  showInvoiceInfo: string;
  fetchAvailableInvoices: () => Promise<void>;
}

export interface Geocode {
  results: Result[];
}

export interface Result {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const LocationMarker: React.FC<MarkerProps> = ({
  invoiceInfo,
  order,
  color = '#808080',
  seladBase = false,
  showInvoiceInfo,

  fetchAvailableInvoices,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [zip, setZip] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  useEffect(() => {
    showInvoiceInfo === invoiceInfo.id
      ? setShowInfoModal(true)
      : setShowInfoModal(false);
  }, [showInvoiceInfo]);

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const handleSuccess = async (error: string) => {
    toast.success(error);
  };

  const postLatLong = async (response: Result[]) => {
    try {
      await api.put(`invoices/location/${invoiceInfo.id}`, {
        latitude: response[0].geometry.location.lat,
        longitude: response[0].geometry.location.lng,
      });

      handleSuccess('Endereço atualizado com sucesso!');
      setShowEdit(false);
      fetchAvailableInvoices();
    } catch (error: any) {
      handleError(error.response.data.message);
    }
  };

  const fetchApiGeocoding = async () => {
    if (!zip || !city) {
      handleError('Preencha todos os campos');
      return;
    }

    if (city !== '' && zip !== '') {
      city.replace(' ', '+');
      zip.replace('-', '');

      try {
        const { data } = await axios.get<Geocode>(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${
            city + '+' + zip
          }&key=AIzaSyDOM3_4X7fai3TdgMZeYmZ3irA5eX9qiXY`,
        );

        postApiAddress(data.results);
      } catch (error: any) {
        handleError(error.message);
      }
    }
  };

  const postApiAddress = async (response: Result[]) => {
    try {
      await api.put(`/invoices/${invoiceInfo.id}/address`, {
        cep: zip,
        address: city,
      });

      postLatLong(response);
    } catch (error: any) {
      handleError(error.response.data.error);
    }
  };

  return (
    <MarkerWrapper className="marker-wrapper">
      <Info color={color} showInfo={showInfoModal}>
        <InfoWrapper className="info-wrapper">
          <div
            className="info__color-indicator"
            onClick={() => setShowEdit(false)}
          >
            Rota
          </div>

          <div style={{ display: 'flex', gap: '5px' }}>
            {showEdit && (
              <IoArrowBackCircleOutline
                className="icon"
                color="#0440a0"
                size={32}
                onClick={() => setShowEdit(false)}
              />
            )}

            <IoCloseCircleOutline
              className="icon"
              color="#0440a0"
              size={32}
              onClick={() => setShowInfoModal(!showInfoModal)}
            />
          </div>
        </InfoWrapper>

        <h4>
          <strong>
            {showEdit ? 'Insira o novo endereço' : invoiceInfo.client_name}
          </strong>
        </h4>

        {showEdit ? (
          <div
            className="info__loading-data-wrapper"
            style={{ minHeight: '150px' }}
          >
            <Input
              style={{ marginBottom: '20px' }}
              maxLength={9}
              value={zip}
              placeholder="Digite o CEP"
              onChange={(e) => setZip(maskCep(e.target.value))}
            />
            <Input
              placeholder="Digite o endereço"
              onChange={(e) => setCity(e.target.value)}
            />

            <ButtonRadius>
              <FaSave
                color="white"
                size={22}
                onClick={() => fetchApiGeocoding()}
              />
            </ButtonRadius>
          </div>
        ) : (
          <div className="info__loading-data-wrapper">
            <div className="info__loading-data-wrapper__info">
              <img width="15px" alt="icon" src={fileImg} />
              <strong>Número NF:</strong> {invoiceInfo.formatted_invoice}
            </div>

            <div className="info__loading-data-wrapper__info">
              <img width="15px" alt="icon" src={fileImg} />
              <strong>Número do Pedido:</strong> {invoiceInfo.order_number}
            </div>

            <div className="info__loading-data-wrapper__info">
              <img width="15px" alt="icon" src={markImg} />
              {invoiceInfo.address}
            </div>

            <div className="info__loading-data-wrapper__info">
              <img width="15px" alt="icon" src={clockImg} />
              <strong>CEP:</strong> {invoiceInfo.cep}
            </div>

            <div className="info__loading-data-wrapper__info">
              <img width="15px" alt="icon" src={boxImg} />
              <strong>Caixas:</strong> {invoiceInfo.amount_boxes}
            </div>

            <div className="info__loading-data-wrapper__info">
              <img width="15px" alt="icon" src={timeImg} />
              <strong>Cubagem:</strong> {(+invoiceInfo?.cubage || 0).toFixed(3)}{' '}
              m³
            </div>

            <div className="info__loading-data-wrapper__info">
              <img width="15px" alt="icon" src={boxImg} />
              <strong>Peso:</strong> {invoiceInfo?.weight?.toFixed(2)}
            </div>

            {invoiceInfo.id !== 'selad_transportes' && (
              <ButtonRadius>
                <FaEdit
                  color="white"
                  size={22}
                  onClick={() => setShowEdit(true)}
                />
              </ButtonRadius>
            )}
          </div>
        )}
      </Info>
      <Marker
        tagColor={`${color}`}
        onClick={() => setShowInfoModal(!showInfoModal)}
      >
        {seladBase ? (
          <HorseIcon src={seladHorse} alt="Sede Selad" />
        ) : (
          <Number tagColor={`${color}`}>{order}</Number>
        )}
      </Marker>
    </MarkerWrapper>
  );
};
