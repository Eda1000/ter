import React, { ChangeEvent, useState } from 'react';
import { Pagination } from 'antd';
import { toast } from 'react-toastify';

import { PaginationContainer } from '../../../../components/PaginationContainer';
import { Spinner } from '../../../../components/Spinner/Spinner';
import { ActionButton } from '../../../../components/OrderDetails/_orderDetails';

import { ListInvoice } from '../../../../Interfaces/ListInvoices';
import api from '../../../../services/api';

import {
  BarCodeModal,
  ButtonTable,
  Close,
  Modal,
  ModalWrapper,
  Status,
  Table,
  TableWrapper,
} from './styles';

interface TableProps {
  invoices: ListInvoice[];
  loading: boolean;
  page: number;
  total: number;
  handleChangePage: Function;
  setInvoice: Function;
  setShowOrderDetails: Function;
}

export const TableComponent: React.FC<TableProps> = ({
  invoices,
  loading,
  page,
  total,
  handleChangePage,
  setInvoice,
  setShowOrderDetails,
}) => {
  const [showBar, setShowBar] = useState(false);
  const [collectionInfoId, setCollectionInfoId] = useState('');
  const [barCode, setBarCode] = useState('Leia o código de barras...');
  const [loadingBar, setLoading] = useState(false);

  const [invoiceId, setInvoiceId] = useState('');

  const onBarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setBarCode(value);
  };

  const onBarSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<{
        results: {
          id: string;
          collection_information_id: string;
        }[]
      }>(`/collection-informations/orders?page=1&limit=1&invoice_id=${invoiceId}`);

      await api.post(`/invoices/${invoiceId}/confirm-invoice-access-key`, {
        collection_information_id: data?.results?.[0]?.collection_information_id,
        access_key: barCode,
      });

      toast.success('Nota adicionada com sucesso!');
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    } finally {
      setLoading(false);
    }
  };

  const renderInvoices = () => {
    const orderedInvoices = invoices.sort((a, b) => {
      const date1 = new Date(a.created_at).getTime();
      const date2 = new Date(b.created_at).getTime();

      return date2 - date1;
    });

    const handleClick = (invoice: ListInvoice) => {
      setInvoice(invoice);
      setShowOrderDetails(true);
    };

    return orderedInvoices.map(
      (
        {
          order_number,
          client_name,
          created_at,
          cubage,
          id,
          position,
          name,
          status,
          invoice_number,
          formatted_invoice,
        },
        index,
        item,
      ) => {
        const date = new Date(created_at).toLocaleDateString('pt-BR');
        const time = new Date(created_at).toLocaleTimeString('pt-BR');

        return (
          <tr className="table__order-info" key={index}>
            <td
              data-label="Data da criação"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              {date} {time}
            </td>

            <td
              data-label="Nº do Pedido"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              {order_number}
            </td>

            <td
              data-label="Nº da Nota"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              {formatted_invoice}
            </td>

            <td
              data-label="Nome do Cliente"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              {client_name}
            </td>

            <td
              data-label="Cubagem (m3)"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              {Number(cubage).toFixed(3)}
            </td>

            <td
              data-label="Posição"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              {position}
            </td>

            <td
              data-label="Caminhão"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              {name}
            </td>

            <td data-Label="Ação">
              {!invoice_number && (
                <ButtonTable
                  type="button"
                  onClick={() => {
                    setInvoiceId(id);
                    setShowBar(!showBar);
                  }}
                >
                  Ler código de barras
                </ButtonTable>
              )}
            </td>

            <td
              data-label="Status"
              onClick={() => {
                handleClick(item[index]);
              }}
            >
              <Status status={status}>{status}</Status>
              {/* invoice_progress.length > 0 && (
                <Status
                  status={
                    invoice_progress?.[invoice_progress?.length - 1]
                      ?.invoice_status?.name
                  }
                >
                  {
                    invoice_progress?.[invoice_progress?.length - 1]
                      ?.invoice_status?.name
                  }
                </Status>
              ) */}
            </td>
          </tr>
        );
      },
    );
  };

  return (
    <>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Data criação</th>

              <th>Nº do Pedido</th>

              <th>Nº da Nota</th>

              <th>Nome do Cliente</th>

              {/* <th>Nome da Transportadora</th> */}

              <th>Cubagem (m3)</th>

              <th>Posição</th>

              {/* <th>Usuário</th> */}

              <th>Caminhão</th>

              <th>Ação</th>

              <th>Status</th>
            </tr>
          </thead>

          {!loading && <tbody>{renderInvoices()}</tbody>}
        </Table>

        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          {invoices.length === 0 && !loading && 'Nenhum resultado encontrado'}
        </div>

        <PaginationContainer>
          {!loading ? (
            <Pagination
              defaultCurrent={page}
              total={total}
              onChange={(e) => handleChangePage(e)}
              pageSize={5}
              showSizeChanger={false}
              hideOnSinglePage={true}
            />
          ) : (
            <Spinner />
          )}
        </PaginationContainer>

        {showBar && (
          <Modal>
            <ModalWrapper>
              <Close
                className="close"
                onClick={() => {
                  setShowBar(false);
                  setCollectionInfoId('');
                  setBarCode('');
                }}
              >
                {'\u00D7'}
              </Close>

              <BarCodeModal>
                <input
                  type="text"
                  onChange={onBarChange}
                  className="action-input__barcode"
                  placeholder="Digite o código de barras"
                />
                <ActionButton
                  className="action-button--withheld-invoice"
                  disabled={loadingBar}
                  onClick={onBarSubmit}
                >
                  {loadingBar ? 'Editando...' : 'Salvar'}
                </ActionButton>
              </BarCodeModal>
            </ModalWrapper>
          </Modal>
        )}
      </TableWrapper>
    </>
  );
};
