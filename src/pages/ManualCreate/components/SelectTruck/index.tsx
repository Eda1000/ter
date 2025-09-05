import React, { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import api from '../../../../services/api';

import { HiBadgeCheck } from 'react-icons/hi';

import { Select } from 'antd';
import { Truck } from '../../../../Interfaces/MapInterface';
import { Footer, InputContainer, Label, SaveButton } from './styles';

interface Option {
  value: string;
  label: string;
}

interface OrderFromProps {
  setCollectionInformation: Function;
  setStep: Function;
}

export const SelectTruck: React.FC<OrderFromProps> = ({
  setCollectionInformation,
  setStep,
}) => {
  const [loading, setLoading] = useState(false);
  const [trucks, setTrucks] = useState<Option[]>([]);
  const [selectedTruck, setSelectedTruck] = useState('');

  useEffect(() => {
    getTrucks();
  }, []);

  const getTrucks = async () => {
    try {
      const { data } = await api.get('/trucks', {
        params: {
          limit: 9999,
        },
      });

      setTrucks(
        data.results.map((truck: Truck) => ({
          label: truck.name,
          value: truck.id,
        })),
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSave = async () => {
    if (!selectedTruck) {
      toast.error('Selecione um caminhão');
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post('/collection-informations', {
        truck_id: selectedTruck,
        client_name: '',
      });

      setStep(1);
      setCollectionInformation(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputContainer>
        <Label>
          Caminhão
          <Select
            options={trucks}
            bordered={false}
            value={selectedTruck}
            onChange={(option) => setSelectedTruck(option)}
          />
        </Label>
      </InputContainer>
      <Footer>
        <SaveButton type="button" onClick={handleSave}>
          {loading ? (
            <>
              Salvando
              <LoadingOutlined />
            </>
          ) : (
            <>
              <HiBadgeCheck />
              Salvar seção
            </>
          )}
        </SaveButton>
      </Footer>
    </>
  );
};
