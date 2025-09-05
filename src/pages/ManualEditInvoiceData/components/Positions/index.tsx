import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';

import api from '../../../../services/api';

import positionImg from '../../../../assets/positions/position.svg';
import { HiBadgeCheck } from 'react-icons/hi';
import { IoHandRightSharp } from 'react-icons/io5';

import {
  Container,
  InformationTable,
  Table,
  PositionsHeader,
  PositionSelect,
  Footer,
} from './styles';

interface OrderFromProps {
  setStep: (step: number) => void;
  invoiceID: string;
}

interface Box {
  id: string;
  name: string;
  utilization: number;
  height: string;
  width: string;
  length: string;
  cubage: string;
  weight: string;
  image: string;
  image_url: string;
}

interface InvoiceBox {
  id: string;
  quantity: number;
  invoice_id: string;
  box_id: string;
  box: Box;
  user_id: string;
}

export const Positions: React.FC<OrderFromProps> = ({ setStep, invoiceID }) => {
  const { Option } = Select;
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [customer, setCustomer] = useState<string>('');
  const [boxAmount, setBoxAmount] = useState<number>(0);
  const [boxes, setBoxes] = useState<InvoiceBox[]>([]);

  const [positions, setPositions] = useState<any[]>([]);

  const [choosenPositions, setChoosenPositions] = useState<string[] | null>(
    null,
  );

  useEffect(() => {
    fetchOrderData();

    fetchPositions();
  }, []);

  const fetchOrderData = async () => {
    if (invoiceID) {
      setLoading(true);
      try {
        const response = await api.get(`invoice-status/${invoiceID}`);

        if (response) {
          setInvoiceNumber(response.data.invoice_number);
          setCustomer(response.data.client_name);
          setBoxAmount(response.data.amount_boxes);
          setBoxes(response.data.invoice_boxs);

          fetchPositions();
        }
      } catch (error: any) {
        handleError(error.response?.data?.message || error.toString());
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await api.get(`/positions?page=1&limit=999999`);

      if (response) {
        setPositions(response.data.results);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const renderBoxes = () => {
    return boxes.map(({ box, quantity }, index) => {
      return (
        <tr key={index}>
          <td data-label="Imagem">
            <img src={box.image_url} alt="imagem da caixa" />
          </td>

          <td data-label="Nome">{box.name}</td>

          <td data-label="Dimensões (cm)">
            {Number(box.length) * Number(box.width)}
          </td>

          <td data-label="Cubagem (m³)">{box.cubage}</td>

          <td data-label="Peso cubado (kg)">{box.weight}</td>

          <td data-label="Quantidade">{quantity}</td>
        </tr>
      );
    });
  };

  const renderPositions = () => {
    return positions.map(({ position, id }, index) => {
      return (
        <Option value={id} key={index}>
          {position}
        </Option>
      );
    });
  };

  const handleChange = (value: string[]) => {
    value.length === 0 ? setChoosenPositions(null) : setChoosenPositions(value);
  };

  const savePositions = async () => {
    let selectedPositions: object[] = [];

    choosenPositions?.forEach((position) => {
      const positionObject = {
        id: position,
      };

      selectedPositions.push(positionObject);
    });

    const associateData = {
      invoice_id: invoiceID,

      positions: selectedPositions,
    };

    setSaveLoading(true);
    try {
      const response = await api.post(
        `invoices/positions/associate`,
        associateData,
      );

      if (response) {
        setStep(4);
        history.push('/home');
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Container>
          Carregando informações... {''}
          <LoadingOutlined />
        </Container>
      ) : (
        <Container>
          <h1>Informações</h1>
          <InformationTable>
            <section>
              Número da nota
              <div>{invoiceNumber}</div>
            </section>

            <section>
              Cliente
              <div>{customer}</div>
            </section>

            <section>
              Qtd. Caixas
              <div>{boxAmount}</div>
            </section>
          </InformationTable>

          <h1>Caixas</h1>
          <Table>
            <thead>
              <tr>
                <th>Imagem</th>

                <th>Nome</th>

                <th>Dimensões (cm)</th>

                <th>Cubagem (m³)</th>

                <th>Peso cubado (kg)</th>

                <th>Quantidade</th>
              </tr>
            </thead>

            <tbody>{renderBoxes()}</tbody>
          </Table>

          <PositionsHeader>
            <h2>Armazém</h2>
            <img src={positionImg} alt="Ícone de posições" />
          </PositionsHeader>

          <PositionSelect>
            <h3>Posição</h3>
            <Select
              showSearch={true}
              optionFilterProp="children"
              mode="multiple"
              placeholder="Selecione uma ou mais posições"
              onChange={handleChange}
              maxTagCount={5}
            >
              {renderPositions()}
            </Select>
          </PositionSelect>

          <Footer>
            {/* <button type="button">
            <IoHandRightSharp />
            Congelar
          </button> */}

            <button
              type="button"
              onClick={() => {
                savePositions();
              }}
              disabled={!choosenPositions}
            >
              {saveLoading ? (
                <>
                  Salvando <LoadingOutlined />{' '}
                </>
              ) : (
                <>
                  <HiBadgeCheck />
                  Salvar seção
                </>
              )}
            </button>
          </Footer>
        </Container>
      )}
    </>
  );
};
