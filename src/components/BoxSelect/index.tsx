import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import api from '../../services/api';

import { HiBadgeCheck } from 'react-icons/hi';
import { VscSearch } from 'react-icons/vsc';
import { Spinner } from '../Spinner/Spinner';
import { AiFillCheckCircle } from 'react-icons/ai';

import { LoadingOutlined } from '@ant-design/icons';

import { useBoxes } from '../../hooks/Boxes';

import { Box } from '../Box';

import { Container, Header, BoxContainer, Footer, ShowMore } from './styles';

export interface Box {
  id: string;
  quantity: number;
}

interface OrderFromProps {
  setStep?: (step: number) => void;
  disableSelect: boolean;
  invoiceID?: string;
  edit: boolean;
  setInvoiceCubage?: Function;
}

export const BoxSelect: React.FC<OrderFromProps> = ({
  setStep,
  edit,
  invoiceID,
  disableSelect,
  setInvoiceCubage,
}) => {
  const {
    fetchBoxes,
    fetchBoxesCreateAt,
    fetchBoxesUtilization,
    searchBoxes,
    boxes,
    orderFilter,
    createdAtFilterApi,
    createdAtFilterState,
    utilizationFilterApi,
    utilizationFilterState,
    boxesSearch,
    setBoxesSearch,
    loading,
    total,
  } = useBoxes();
  const [totalSelected, setTotalSelected] = useState(0);
  const [totalCubage, setTotalCubage] = useState<number>(0);

  const [listOfBoxes, setListOfBoxes] = useState<Box[]>([]);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  function changeTotalSelected(total: number) {
    setTotalSelected(total);
  }

  useEffect(() => {
    fetchBoxes(orderFilter, true, false);
  }, []);

  const handleLoadMore = () => {
    if (createdAtFilterApi) {
      fetchBoxesCreateAt(createdAtFilterState, false, true);
    } else if (utilizationFilterApi) {
      fetchBoxesUtilization(utilizationFilterState, false, true);
    } else {
      fetchBoxes(orderFilter, false, true);
    }
  };

  const renderShowMoreSolicitations = () => {
    if (loading) {
      return (
        <div style={{ marginTop: '10px' }}>
          <Spinner />
        </div>
      );
    }

    if (boxes.length < total) {
      return (
        <ShowMore
          onClick={() => {
            handleLoadMore();
          }}
        >
          Carregar mais caixas
        </ShowMore>
      );
    }
  };

  function renderFooter() {
    if (disableSelect) {
      return <></>;
    }
    return (
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
            {/* <button type="button">
              <HiOutlineUpload />
            </button>
            <button type="button">
              <IoHandRightSharp />
              <p>Congelar</p>
            </button> */}

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
    );
  }

  function handleSearch() {
    searchBoxes();
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      searchBoxes();
    }
  };

  function handleChange(value: string) {
    if (value === 'NomeMais' || value === 'NomeMenos') {
      fetchBoxes(value, true, false);
    } else if (value === 'DataMais' || value === 'DataMenos') {
      fetchBoxesCreateAt(value, true, false);
    } else {
      fetchBoxesUtilization(value, true, false);
    }
  }

  const handleSave = async () => {
    if (invoiceID) {
      setApiLoading(true);

      const invoiceData = {
        invoice_id: invoiceID,
        boxes: listOfBoxes,
      };

      try {
        const response = await api.post(
          `invoices/boxes/associate`,
          invoiceData,
        );

        if (response) {
          setStep && setStep(2);
        }
      } catch (error: any) {
        handleError(error.response?.data?.message || error.toString());
      } finally {
        setApiLoading(false);
      }
    }
  };

  const handleError = async (error: string) => {
    toast.error(error);
  };

  return (
    <>
      <Container style={{ marginBottom: '5rem' }}>
        <Header>
          <div>
            <input
              value={boxesSearch}
              onChange={(e) => {
                setBoxesSearch(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              type="search"
              placeholder="Buscar..."
            />
            <VscSearch
              style={{ cursor: 'pointer' }}
              onClick={() => handleSearch()}
            />
          </div>

          <div>
            <label>Classificar por</label>
            <select onChange={(e) => handleChange(e.target.value)}>
              <option value="NomeMais">Nome +</option>
              <option value="NomeMenos">Nome -</option>
              <option value="DataMais">Data +</option>
              <option value="DataMenos">Data -</option>
              <option value="UtilizaçõesMais">Utilizações +</option>
              <option value="UtilizaçõesMenos">Utilizações menos -</option>
            </select>
          </div>
        </Header>

        <BoxContainer>
          {boxes.map((box, index) => (
            <Box
              key={index}
              boxData={box}
              disableSelect={disableSelect}
              changeTotalSelected={changeTotalSelected}
              totalSelected={totalSelected}
              setTotalCubage={setTotalCubage}
              totalCubage={totalCubage}
              setListOfBoxes={setListOfBoxes}
              listOfBoxes={listOfBoxes}
              edit={edit}
              setInvoiceCubage={setInvoiceCubage}
            />
          ))}
        </BoxContainer>
        <>{renderShowMoreSolicitations()}</>
        {renderFooter()}
      </Container>
    </>
  );
};
