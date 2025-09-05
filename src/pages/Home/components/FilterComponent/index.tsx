import { DatePicker, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import locale from 'antd/lib/date-picker/locale/pt_BR';

import moment from 'moment';
import 'moment/locale/pt-br';

import { useAuth } from '../../../../hooks/Auth';
import api from '../../../../services/api';

import { SendModal } from '../../../../components/SendModal';

import {
  AddButton,
  BlockedInfoGroup,
  DownloadIcon,
  Filter,
  FilterButton,
  FilterButtons,
  FilterTitle,
  FiltersHeader,
  FiltersWrapper,
  InfoGroup,
  InfoWrapper,
  Input,
  Label,
  SecondButtonsGroup,
  SecondaryButton,
  SecondaryFilters,
  SelectLabel,
  SendButton,
} from './styles';

interface Status {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface IndividualPerson {
  id: string;
  name: string;
}

export interface User {
  id: string;
  role: Role;
  individual_person: IndividualPerson;
}

export interface Truck {
  id: string;
  name: string;
  plate: string;
  capacity: string;
  is_available: boolean;
  user_id: string;
}

interface FilterProps {
  setQuerySearch: Function;
}

export const FilterComponent: React.FC<FilterProps> = ({ setQuerySearch }) => {
  const { data } = useAuth();
  const { Option } = Select;

  const dateFormat = 'DD/MM/YYYY';

  moment.updateLocale('pt_BR', {
    monthsShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    weekdaysMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  });

  const currentUser = {
    name: 'Admin',
    id: 'aeba1881-a87c-4eb1-84ed-bc58d26944a2',
  };

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [todayFilterIsActive, setTodayFilterIsActive] =
    useState<boolean>(false);
  const [myOrdersFilterisActive, setMyOrdersFilterisActive] =
    useState<boolean>(false);
  const [loadedFilterIsActive, setLoadedFilterIsActive] =
    useState<boolean>(false);
  const [collectedFilteIsActive, setCollectedFilteIsActive] =
    useState<boolean>(false);

  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [initialDate, setInitialDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [truck, setTruck] = useState<string>('');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [finalDate, setFinalDate] = useState<string>('');
  const [driver, setDriver] = useState<string>('');
  const [customer, setCustomer] = useState<string>('');
  const [user, setUser] = useState<string>('');

  const [orderBy, setOrderBy] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const [invoiceStatus, setInvoiceStatus] = useState<Status[]>();
  const [users, setUsers] = useState<User[]>();
  const [drivers, setDrivers] = useState<User[]>();
  const [trucks, setTrucks] = useState<Truck[]>();

  useEffect(() => {
    if (showFilters) {
      fetchStatus();
      fetchUsers();
      fetchTrucks();
    }
  }, [showFilters]);

  useEffect(() => {
    handleQueries();
  }, [
    initialDate,
    finalDate,
    user,
    driver,
    status,
    initialDate,
    finalDate,
    driver,
    truck,
    orderBy,
  ]);

  const fetchStatus = async () => {
    try {
      const response = await api.get(`invoice-status`);

      if (response) {
        setInvoiceStatus(response.data);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get(`users?limit=99999`);

      if (response) {
        setUsers(response.data.results);

        getDrivers(response.data.results);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const fetchTrucks = async () => {
    try {
      const response = await api.get(`trucks?limit=99999`);

      if (response) {
        setTrucks(response.data.results);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const getDrivers = (users: User[]) => {
    const drivers = users.filter(({ role }) => role.name === 'Motorista');

    setDrivers(drivers);
  };

  const getDownloadInvoices = async () => {
    try {
      const response = await api.post(
        '/invoices/download',
        {},
        {
          params: {
            driver: driver || undefined,
            truck: truck || undefined,
            invoice_number: invoiceNumber || undefined,
            start_date: initialDate || undefined,
            end_date: finalDate || undefined,
            current_status: status || undefined,
            order_number: orderNumber || undefined,
            client: customer || undefined,
            user_id: user || undefined,
            sort_by: sortBy || undefined,
            order_by: orderBy || undefined,
            collection_completed: true,
          },
        },
      );

      const invoice = response.data.invoice;

      const base64String = `data:application/vnd.ms-excel;base64,${invoice}`;

      const responseBase64 = await fetch(base64String);

      const blob = await responseBase64.blob();

      const link = document.createElement('a');

      link.href = window.URL.createObjectURL(blob);

      link.download = 'notas.xlsx';

      link.click();
    } catch (error: any) {
      handleError(error.response?.data?.message || error.message);
    }
  };

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const handleSuccess = async (error: string) => {
    toast.success(error);
  };

  const handleTodayFilter = () => {
    let todayRaw = new Date();
    todayRaw.setHours(0, 0, 0, 0);
    const today = todayRaw.toISOString();

    todayFilterIsActive && initialDate !== ''
      ? setInitialDate('')
      : setInitialDate(today);

    setFinalDate('');

    setTodayFilterIsActive(!todayFilterIsActive);
  };

  const handleMyOrdersFilter = () => {
    user !== '' ? setUser('') : setUser(currentUser.id);

    setMyOrdersFilterisActive(!myOrdersFilterisActive);
  };

  const handleLoadedFilter = () => {
    setLoadedFilterIsActive(!loadedFilterIsActive);
  };

  const handleCollectedFilter = () => {
    setCollectedFilteIsActive(!collectedFilteIsActive);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
  };

  const handleInitialDate = (value: any) => {
    if (value) {
      const isoDate = new Date(value._d).toISOString();

      setInitialDate(isoDate);
    } else {
      setInitialDate('');
    }
  };

  const handleFinalDate = (value: any) => {
    if (value) {
      const isoDate = new Date(value._d).toISOString();

      setFinalDate(isoDate);
    } else {
      setFinalDate('');
    }
  };

  const handleUser = (value: string) => {
    setUser(value);
  };

  const handleDriver = (value: string) => {
    setDriver(value);
  };

  const handleTruck = (value: any) => {
    setTruck(value);
  };

  const handleOrderBy = (value: string) => {
    const order: { [key: string]: string[] } = {
      date_desc: ['created_at', 'DESC'],
      date_asc: ['created_at', 'ASC'],
      number_desc: ['invoice_number', 'DESC'],
      number_asc: ['invoice_number', 'ASC'],
    };

    function setThings(data = '', order = '') {
      setSortBy(data);

      setOrderBy(order);
    }

    return !value ? setThings() : setThings(order[value][0], order[value][1]);
  };

  const handleQueries = () => {
    const queries = [
      { query: 'invoice_number', value: invoiceNumber },
      { query: 'start_date', value: initialDate },
      { query: 'end_date', value: finalDate },
      { query: 'current_status', value: status },
      { query: 'truck', value: truck },
      { query: 'order_number', value: orderNumber },
      { query: 'driver', value: driver },
      { query: 'client', value: customer },
      { query: 'user_id', value: user },
      { query: 'sort_by', value: sortBy },
      { query: 'order_by', value: orderBy },
    ];

    const mountedQuery = queries.reduce(
      (acc, { query, value }, index) =>
        `${acc}${addAmpersand(index, value)}${addQuery(query, value)}`,
      '?',
    );

    const finalQuery = sanitizeExtraSign(mountedQuery);

    finalQuery === '?' ? setQuerySearch(undefined) : setQuerySearch(finalQuery);
  };

  const addAmpersand = (index: number, value: string) => {
    return index !== 0 && value !== '' ? '&' : '';
  };

  const addQuery = (query: string, value: string) => {
    return value !== '' ? query + '=' + value : '';
  };

  const sanitizeExtraSign = (query: string) => {
    return query.replace('?&', '?');
  };

  const renderUserOptions = () => {
    return (
      users &&
      users.map(({ individual_person, id }, index) => {
        return (
          <Option key={index} value={id}>
            {individual_person?.name}
          </Option>
        );
      })
    );
  };

  const renderStatusOptions = () => {
    return (
      invoiceStatus &&
      invoiceStatus.map(({ id, name }, index) => {
        return (
          <Option key={index} value={id}>
            {name}{' '}
          </Option>
        );
      })
    );
  };

  const renderDriverOptions = () => {
    return (
      drivers &&
      drivers.map(({ individual_person, id }, index) => {
        return (
          <Option key={index} value={id}>
            {individual_person?.name}
          </Option>
        );
      })
    );
  };

  const renderTruckOptions = () => {
    return (
      trucks &&
      trucks.map(({ name, id }, index) => {
        return (
          <Option key={index} value={id}>
            {name}
          </Option>
        );
      })
    );
  };

  const handleOnKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleQueries();
    }
  };

  const showDownloadButton =
    driver ||
    truck ||
    invoiceNumber ||
    initialDate ||
    finalDate ||
    status ||
    orderNumber ||
    customer ||
    user ||
    sortBy ||
    orderBy;

  const [sendNF, setSendNF] = useState(false);
  const [sendError, setSendError] = useState(false);

  const onSuccessSend = async (value: string) => {
    try {
      const { data } = await api.post<string>('/invoices/send-email', {
        access_key: value,
      })

      handleSuccess(data);
      setSendNF(false);
    } catch (error: any) {
      handleError(error.response.data.message);
      setSendError(true);
    }
  }

  return (
    <Filter>
      {sendNF && (
        <SendModal
          error={sendError}
          setError={setSendError}
          onSuccessfulRead={onSuccessSend}
          onClose={() => setSendNF(false)}
        />
      )}

      <FilterButtons>
        <FilterTitle>Notas fiscais</FilterTitle>

        <SecondButtonsGroup>
          <SendButton onClick={() => setSendNF(true)}>Consultar NF</SendButton>
          <AddButton to="/pedido/cadastro-manual">Criar manualmente</AddButton>
          {data?.user?.role?.name !== 'Coleta' && (
            <FilterButton
              onClick={() => setShowFilters(!showFilters)}
              collapsed={showFilters}
              type="button"
            >
              Filtrar
            </FilterButton>
          )}
        </SecondButtonsGroup>
      </FilterButtons>

      <FiltersWrapper
        expand={showFilters}
        as="form"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleQueries();
        }}
      >
        <FiltersHeader>
          <SecondaryFilters>
            <SecondaryButton
              type="button"
              onClick={() => handleTodayFilter()}
              active={todayFilterIsActive}
            >
              Hoje
            </SecondaryButton>
            <SecondaryButton
              type="button"
              onClick={() => handleMyOrdersFilter()}
              active={myOrdersFilterisActive}
            >
              Minhas notas
            </SecondaryButton>
            {showDownloadButton && (
              <SecondaryButton
                as="button"
                type="button"
                onClick={getDownloadInvoices}
                active
                style={{
                  fontWeight: 700,
                }}
              >
                <DownloadIcon />
                Download
              </SecondaryButton>
            )}
          </SecondaryFilters>
          <SecondaryFilters
            style={{
              width: 'fit-content',
            }}
          >
            <SecondaryButton active>Pesquisar</SecondaryButton>
          </SecondaryFilters>
        </FiltersHeader>

        <InfoWrapper>
          <InfoGroup>
            <Label>
              Número da NF
              <Input
                onChange={(e) => setInvoiceNumber(e.target.value)}
                onBlur={() => handleQueries()}
                onKeyDown={handleOnKeyDown}
              />
            </Label>

            <Label>
              Data inicial
              <DatePicker
                onChange={handleInitialDate}
                placeholder="dd/mm/aaa"
                format={dateFormat}
                showToday={false}
                locale={locale}
                showTime={{ format: 'HH:mm' }}
                onBlur={() => handleQueries()}
                onKeyDown={handleOnKeyDown}
              />
            </Label>

            <SelectLabel>
              Status
              <Select
                placeholder="Selecione...."
                bordered={false}
                onChange={handleStatus}
                onKeyDown={handleOnKeyDown}
              >
                <Option value={''}>{''}</Option>
                {invoiceStatus && renderStatusOptions()}
              </Select>
            </SelectLabel>
          </InfoGroup>

          <InfoGroup>
            <Label>
              Número do Pedido
              <Input
                onChange={(e) => setOrderNumber(e.target.value)}
                onBlur={() => handleQueries()}
                onKeyDown={handleOnKeyDown}
              />
            </Label>

            <Label>
              Data Final
              <DatePicker
                onChange={handleFinalDate}
                placeholder="dd/mm/aaa"
                format={dateFormat}
                showToday={false}
                locale={locale}
                showTime={{ format: 'HH:mm' }}
                onBlur={() => handleQueries()}
                onKeyDown={handleOnKeyDown}
              />
            </Label>

            <SelectLabel>
              Ordenar por
              <Select
                placeholder="Selecione...."
                bordered={false}
                onChange={handleOrderBy}
                onKeyDown={handleOnKeyDown}
              >
                <Option value={''}>{''}</Option>
                <Option value={'date_desc'}>Data -</Option>
                <Option value={'date_asc'}>Data +</Option>
                <Option value={'number_desc'}>Número -</Option>
                <Option value={'number_asc'}>Número +</Option>
              </Select>
            </SelectLabel>

            {/* <SelectLabel>
              Motorista
              <Select
                placeholder="Selecione...."
                bordered={false}
                onChange={handleDriver}
                onKeyDown={handleOnKeyDown}
              >
                <Option value={''}>{''}</Option>

                {drivers && renderDriverOptions()}
              </Select>
            </SelectLabel> */}
          </InfoGroup>

          <BlockedInfoGroup>
            <Label>
              Cliente
              <Input
                onChange={(e) => setCustomer(e.target.value)}
                onBlur={() => handleQueries()}
                onKeyDown={handleOnKeyDown}
              />
            </Label>

            {/* <Label>
              Horário
              <Input
                onChange={(e) => setHour(e.target.value)}
                onBlur={() => handleQueries()}
                onKeyDown={handleOnKeyDown}
              />
            </Label> */}

            <SelectLabel>
              Usuário
              <Select
                placeholder="Selecione...."
                bordered={false}
                onChange={handleUser}
                onBlur={() => handleQueries()}
                onKeyDown={handleOnKeyDown}
              >
                <Option value={''}>{''}</Option>

                {users && renderUserOptions()}
              </Select>
            </SelectLabel>

            <SelectLabel>
              Caminhão
              <Select
                placeholder="Selecione...."
                bordered={false}
                onChange={handleTruck}
                onKeyDown={handleOnKeyDown}
                clearIcon
              >
                <Option value={''}>{''}</Option>

                {trucks && renderTruckOptions()}
              </Select>
            </SelectLabel>
          </BlockedInfoGroup>
        </InfoWrapper>
      </FiltersWrapper>
    </Filter>
  );
};
