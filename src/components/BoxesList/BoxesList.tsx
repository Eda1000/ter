/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Box from '../Box';
import { Boxes } from '../../hooks/Boxes';


import api from '../../services/api';

import { Container, BoxContainer, BoxesSection, HeaderBoxes, Close } from './styles';
import { Pagination } from 'antd';

interface BoxList {
  id: string;
  quantity: number;
}

interface OrderFromProps {
  invoiceID?: string;
  setShowOrderDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoxesList: React.FC<OrderFromProps> = ({
  invoiceID,
  setShowOrderDetails,
}) => {
  const [totalSelected, setTotalSelected] = useState(0);
  const [totalCubage, setTotalCubage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [listOfBoxes, setListOfBoxes] = useState<BoxList[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(100);

  const [boxes, setBoxes] = useState<Boxes[]>([]);

  function changeTotalSelected(total: number) {
    setTotalSelected(total);
  }

  const getBoxes = async () => {
    setLoading(true);

    try {
      const { data } = await api.get('/collection-informations/orders/count-boxes', {
        params: {
          invoice_id: invoiceID,
          page: '1',
          limit: '8',
        },
      });

      if (data) {
        setBoxes(data.results);
        setPage(data.page);
        setTotal(data.total);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  }

  const handleChangePage = async (e: number) => {
    setLoading(true);

    try {
      const { data } = await api.get('/collection-informations/orders/count-boxes', {
        params: {
          invoice_id: invoiceID,
          page: e,
          limit: '8',
        },
      });

      if (data) {
        setBoxes(data.results);
        setPage(e);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoxes();
  }, [invoiceID]);

  return (
    <Container style={{ marginBottom: '0rem' }}>
      <BoxesSection style={{ marginTop: '0rem' }}>
        <HeaderBoxes>
          <Close className="close" onClick={() => setShowOrderDetails(false)}>
            {'\u00D7'}
          </Close>
        </HeaderBoxes>

        <BoxContainer style={{ marginTop: '0rem' }}>
          {boxes.length === 0 && (
            'Nenhuma caixa cadastrada.'
          )}

          {boxes.map((box, index) => (
            <Box
              key={index}
              boxData={box}
              disableSelect
              changeTotalSelected={changeTotalSelected}
              totalSelected={totalSelected}
              setTotalCubage={setTotalCubage}
              totalCubage={totalCubage}
              setListOfBoxes={setListOfBoxes}
              listOfBoxes={listOfBoxes}
              height='9.5rem'
              padding='0.8rem 0.8rem 0 0.8rem'
              quantity={Number(box?.quantity) || 1}
              edit={false}
            />
          ))}
        </BoxContainer>

        {!loading ? (
          <div style={{ padding: '10px 0 0 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Pagination
              defaultCurrent={page}
              total={total}
              onChange={(e) => handleChangePage(e)}
              pageSize={8}
              showSizeChanger={false}
            />
          </div>
        ) : (
          ''
        )}
      </BoxesSection>
    </Container>
  );
};
