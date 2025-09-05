import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

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

export const CreateTrucks = () => {
  const { data } = useAuth();
  const history = useHistory();

  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [userId, setUserId] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [responsibles, setResponsibles] = useState<ResponsiblesInterface[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const { Option } = Select;

  const availability = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  useEffect(() => {
    getResponsibles();
  }, []);

  const getResponsibles = async () => {
    const res = await api.get(`/users`, {
      params: {
        limit: 9999,
        page: 1,
        role: 'Motorista App',
      }
    });
    setResponsibles(res.data.results);
  };

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
        total_weight: totalWeight,
        capacity,
        user_id: userId,
        is_available: isAvailable,
      };
      await api.post(`/trucks`, truck);

      toast.success('Caminhão cadastrado com sucesso!');
      setLoading(false);

      setName('');
      setPlate('');
      setCapacity(0);
      setUserId(null as any);
      setTotalWeight(0);
    } catch (err) {
      handleError(err);
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
            <PageTitle>Cadastrar Caminhão</PageTitle>

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
                  placeholder="Selecione...."
                  value={userId}
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
              <SaveButton onClick={() => handleSubmit()} disabled={disabled()}>
                {!loading ? (
                  <>
                    <HiBadgeCheck size={24} />
                    Salvar Caminhão
                  </>
                ) : (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              </SaveButton>

              <BackButton onClick={() => history.push('/caminhoes')}>
                Voltar
              </BackButton>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
