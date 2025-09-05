/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AiFillCheckCircle } from 'react-icons/ai';
import { HiBadgeCheck } from 'react-icons/hi';
import { VscSearch } from 'react-icons/vsc';

import { Invoice } from '../../Interfaces/HomeInterface';
import { Boxes } from '../../hooks/Boxes';
import api from '../../services/api';
import { BoxAmount } from '../BoxAmount';
import { Spinner } from '../Spinner/Spinner';

import { Pagination } from 'antd';
import {
  BoxContainer,
  Container,
  Footer,
  Header,
  PaginationWrapper,
  SearchBar,
  SearchButton,
  SearchInput,
  Select,
  SelectContainer,
  SelectLabel,
} from './styles';

interface IBox extends Boxes {
  id: string;
}

interface Props {
  setStep: (step: number) => void;
  invoice?: Invoice;
  setFinalBoxes: React.Dispatch<React.SetStateAction<Boxes[]>>;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice | undefined>>;
  amountOfBoxes: number;
}

const PAGE_LIMIT = 9;

export const BoxAmountList: React.FC<Props> = ({
  invoice,
  amountOfBoxes,
  setStep,
  setFinalBoxes,
  setInvoice,
}) => {
  const [listOfBoxes, setListOfBoxes] = useState<IBox[]>([]);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const [boxes, setBoxes] = useState<Boxes[]>([]);
  const [order, setOrder] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [maximumPage, setMaximumPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBoxes(search, order, page);
  }, []);

  const getBoxes = async (q: string, newOrder: string, newPage: number) => {
    const [sortBy, sortDir] = newOrder.split(':');

    setPage(newPage);

    try {
      setLoading(true);

      const params = {
        q: q || undefined,
        page: newPage || 1,
        sortBy: sortBy || 'name',
        orderBy: sortDir || 'ASC',
        limit: PAGE_LIMIT,
      };

      const { data } = await api.get('/boxes', {
        params,
      });

      setBoxes(data.results);
      setMaximumPage(Math.ceil((data.total || 1) / PAGE_LIMIT));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const amounts: Record<string, number> = Object.fromEntries(
    listOfBoxes.map((boxAmount) => [boxAmount.id, Number(boxAmount.quantity || 0)]),
  );

  const totalSelected = listOfBoxes.reduce((acc, box) => {
    return acc + (Number(box?.quantity || 0));
  }, 0);

  const totalCubage = listOfBoxes.reduce((acc, box) => {
    return acc + (Number(box.cubage || 0) * Number(box?.quantity || 0) || 0);
  }, 0);

  const handleSave = async () => {
    if (totalSelected !== amountOfBoxes) {
      toast.error(`A quantidade de caixas deve ser igual a ${amountOfBoxes}`);
      return;
    }

    setApiLoading(true);

    const orders = listOfBoxes.flatMap((box) =>
      Array(Number(box?.quantity)).fill({
        box_id: box.id,
        order_number: invoice?.order_number,
      }),
    );

    const ordersWithVolumeNumbers = orders.map((order, index) => ({
      ...order,
      volume_number: index + 1,
    }));

    try {
      const response = await api.post(
        `invoices/${invoice?.id}/confirm-amount-box`,
        {
          orders: ordersWithVolumeNumbers,
        },
      );

      setFinalBoxes(listOfBoxes);

      if (response.data.invoice) {
        setInvoice(response.data.invoice);
      }

      if (response) {
        setStep(3);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.toString());
    } finally {
      setApiLoading(false);
    }
  };

  const handleChangeAmount = (box: Boxes, amount: number) => {
    if (amount === 0) {
      setListOfBoxes((prev) =>
        prev.filter((filterBox) => filterBox.id !== box.id),
      );

      return;
    }

    setListOfBoxes((prev) => {
      if (prev.some((mapBox) => mapBox.id === box.id)) {
        return prev.map((mapBox) =>
          mapBox.id === box.id ? { ...mapBox, quantity: amount } : mapBox,
        );
      }

      return [...prev, { ...box, quantity: amount }];
    });
  };

  return (
    <>
      <Container style={{ marginBottom: '5rem' }}>
        <Header>
          <SearchBar
            onSubmit={(e) => {
              e.preventDefault();
              getBoxes(search, order, 1);
            }}
          >
            <SearchInput
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Buscar..."
            />
            <SearchButton>
              <VscSearch />
            </SearchButton>
          </SearchBar>

          <SelectContainer>
            <SelectLabel htmlFor="orderSelect">Classificar por</SelectLabel>
            <Select
              id="orderSelect"
              onChange={(e) => {
                setOrder(e.target.value);
                getBoxes(search, e.target.value, 1);
              }}
              value={order}
            >
              <option value="name:ASC">Nome +</option>
              <option value="name:DESC">Nome -</option>
              <option value="created_at:ASC">Data +</option>
              <option value="created_at:DESC">Data -</option>
              <option value="utilization:ASC">Utilizações +</option>
              <option value="utilization:DESC">Utilizações menos -</option>
            </Select>
          </SelectContainer>
        </Header>

        {loading ? (
          <div style={{ marginTop: '10px' }}>
            <Spinner />
          </div>
        ) : (
          <>
            <BoxContainer>
              {boxes.map((box) => (
                <BoxAmount
                  key={box.id}
                  box={box}
                  amount={amounts[box.id] || 0}
                  onChangeAmount={(newAmount: number) => {
                    handleChangeAmount(box, newAmount);
                  }}
                />
              ))}
            </BoxContainer>
            <PaginationWrapper>
              <Pagination
                defaultCurrent={page}
                total={PAGE_LIMIT * maximumPage}
                onChange={(e) => {
                  getBoxes(search, order, e);
                }}
                pageSize={PAGE_LIMIT}
                showSizeChanger={false}
                hideOnSinglePage={true}
              />
            </PaginationWrapper>
          </>
        )}

        <Footer className="box-select__footer">
          <section>
            <div>
              <h2>
                <AiFillCheckCircle />
                Selecionadas: {totalSelected}
              </h2>
              <p>
                Cubagem:
                <strong> {totalCubage.toFixed(3)} m³</strong>
              </p>
            </div>

            <div>
              <button
                disabled={listOfBoxes.length <= 0}
                type="button"
                onClick={() => handleSave()}
              >
                {apiLoading ? (
                  <>
                    <p>Salvando </p>
                    <LoadingOutlined />
                  </>
                ) : (
                  <>
                    <HiBadgeCheck />
                    <p>Salvar seção</p>
                  </>
                )}
              </button>
            </div>
          </section>
        </Footer>
      </Container>
    </>
  );
};
