import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Select, Radio } from 'antd';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'antd';

import { HiBadgeCheck } from 'react-icons/hi';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
  BackButton,
  ButtonsWrapper,
  Container,
  Content,
  DeleteButton,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  RadioWrapper,
  SaveButton,
  SelectLabel,
  ShowAllTrucksButton,
  TitleRow,
} from './styles';

interface ResponsiblesInterface {
  id: string;
  individual_person: {
    name: string;
  };
}
interface TruckDataInterface {
  state: {
    id: string;
    name: string;
    plate: string;
    total_weight: number;
    capacity: number;
    user_id: string;
    is_available: boolean;
  };
}

export const EditTruck = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const truckData = location.state as TruckDataInterface;

  const [name, setName] = useState(truckData.state.name);
  const [plate, setPlate] = useState(truckData.state.plate);
  const [capacity, setCapacity] = useState(truckData.state.capacity);
  const [userId, setUserId] = useState(truckData.state.user_id);
  const [totalWeight, setTotalWeight] = useState<number>(
    truckData.state.total_weight,
  );

  const [isAvailable, setIsAvailable] = useState(truckData.state.is_available);
  const [responsibles, setResponsibles] = useState<ResponsiblesInterface[]>([]);
  const [responsible, setResponsible] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { Option } = Select;

  const availability = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  useEffect(() => {
    console.log(truckData);

    getResponsibles();
    getResponsible();
  }, []);

  async function getResponsibles() {
    const res = await api.get(`/users?limit=9999`);

    setResponsibles(res.data.results);
  }

  async function getResponsible() {
    const res = await api.get(`/users/${truckData.state.user_id}`);

    setResponsible(res.data.individual_person?.name);
  }

  const handleChangeSelection = (value: any) => {
    setUserId(value);
  };

  const handleAvailability = (e: any) => {
    const option = e.target.value;
    setIsAvailable(option);
  };

  const validateFormFields = () => {
    if (!name.trim() || !plate || !capacity || !userId) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFormFields()) {
      toast.error('Digite todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const truck = {
        name,
        plate,
        capacity: Number(capacity),
        total_weight: totalWeight,
        user_id: userId,
        is_available: isAvailable,
      };

      await api.put(`/trucks/${truckData.state.id}`, truck);

      toast.success('Caminhão editado!');
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const deleteTruck = async () => {
    setLoadingDelete(true);
    try {
      await api.delete(`/trucks/${truckData.state.id}`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      setLoadingDelete(false);
      toast.success('Caminhão removido!');
      navigate('/caminhoes');
    } catch (err) {
      handleError(err);
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

  const handlePlate = (e: any) => {
    if (e.target.value.match('^[A-Za-z0-9-]*$') != null) {
      setPlate(e.target.value.toUpperCase());
    }
  };

  const handleCapacity = (e: any) => {
    if (e.target.value.match('^[0-9,.]*$') != null) {
      setCapacity(e.target.value);
    }
  };

  const disabled = () => {
    if (
      name.length === 0 ||
      plate.length < 6 ||
      capacity <= 0 ||
      totalWeight === 0
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Editar Caminhão</PageTitle>
            <Link to="/caminhoes">
              <ShowAllTrucksButton>Ver todos os caminhões</ShowAllTrucksButton>
            </Link>
          </TitleRow>
          <Informations>
            <InfoGroup>
              <Label>
                Nome
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Label>

              <Label>
                <div style={{ display: 'flex' }}>
                  <p>Placa</p>
                  <Tooltip title="Formatos de placa permitidos (ABC-1234, ABC1C21, ABC12C2).">
                    <FaInfoCircle
                      color="#c5c5c5"
                      style={{ margin: '10px 0 0 10px', cursor: 'pointer' }}
                    />
                  </Tooltip>
                </div>
                <Input
                  value={plate}
                  onChange={(e) => handlePlate(e)}
                  style={{ textTransform: 'uppercase' }}
                  type="text"
                  maxLength={8}
                />
              </Label>

              <Label>
                Capacidade (m³)
                <Input
                  value={capacity}
                  onChange={(e) => handleCapacity(e)}
                  type="text"
                  maxLength={16}
                />
              </Label>
            </InfoGroup>

            <InfoGroup>
              <Label>
                Peso
                <Input
                  defaultValue={totalWeight}
                  onChange={(e) => setTotalWeight(Number(e.target.value))}
                  type="number"
                  maxLength={16}
                />
              </Label>

              <SelectLabel>
                Responsável
                <Select
                  placeholder={responsible}
                  bordered={false}
                  onChange={handleChangeSelection}
                >
                  {responsibles.map((responsible) => (
                    <Option key={responsible.id} value={responsible.id}>
                      {responsible.individual_person?.name}
                    </Option>
                  ))}
                </Select>
              </SelectLabel>

              <Label>
                Disponível
                <RadioWrapper>
                  <Radio.Group
                    options={availability}
                    onChange={handleAvailability}
                    value={isAvailable}
                  />
                </RadioWrapper>
              </Label>
            </InfoGroup>
          </Informations>
          <ButtonsWrapper>
            <MainButtons>
              <SaveButton onClick={() => handleSubmit()}>
                {!loading ? (
                  <>
                    <HiBadgeCheck size={24} />
                    Salvar Caminhão
                  </>
                ) : (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              </SaveButton>
              <BackButton onClick={() => navigate('/caminhoes')}>
                Voltar
              </BackButton>
            </MainButtons>
            <DeleteButton onClick={() => deleteTruck()}>
              {!loadingDelete ? (
                <>Excluir</>
              ) : (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              )}
            </DeleteButton>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
