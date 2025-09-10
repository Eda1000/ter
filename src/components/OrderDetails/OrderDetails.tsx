/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DatePicker } from 'antd';
import 'moment/locale/pt-br';
import locale from 'antd/lib/date-picker/locale/pt_BR';

import { HiBadgeCheck } from 'react-icons/hi';

import moment from 'moment';

import caution_icon from '../../assets/general/caution_icon.svg';
import success_icon from '../../assets/general/success_icon.svg';

import left_arrow from '../../assets/general/left_arrow.svg';

import {
  AddButton,
  ActionButton,
  Close,
  Container,
  Goback,
  Incidents,
  AddIncident,
  OrderInfo,
  SeeMoreButton,
  Table,
  Label,
  SaveButton,
  OrderOperators,
} from './_orderDetails';

import { BoxSelect } from '../BoxSelect';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { dateMask } from '../../utils/Masks';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { InfoModal } from '../Modal';
import { BoxesList } from '../BoxesList/BoxesList';
import { InvoiceDetail } from '../../Interfaces/Invoice';

interface Props {
  truckId: string;
  invoiceId: string;
  setShowOrderDetails: Function;
  onDeleteInvoice: () => void;
}

export interface Occurrence {
  id: string;
  type: string;
  invoice_id: string;
  created_at: string;
  updated_at: string;
  description: string;
  image_url?: string;
}

interface IOperator {
  step: string;
  user: {
    individual_person: {
      name: string;
    };
  };
  updated_at: string;
}

export const OrderDetails: React.FC<Props> = ({
  truckId,
  invoiceId,
  onDeleteInvoice,
  setShowOrderDetails,
}) => {
  const dateFormat = 'DD/MM/YYYY';

  const [infoSelected, setInfoSelected] = useState<string>('order-info');
  const [loading, setLoading] = useState<boolean>(false);

  const [operators, setOperators] = useState<IOperator[]>([]);

  const [occurrences, setOccurrences] = useState<Occurrence[]>();
  const [occurrenceData, setOccurrenceData] = useState<{
    type: string;
    description: string;
    image?: File;
    invoice_id: string;
  }>({
    type: '',
    description: '',
    image: undefined,
    invoice_id: invoiceId,
  });

  const [invoice, setInvoice] = useState<InvoiceDetail | undefined>(undefined);

  const [freezeInvoice, setFreezeInvoice] = useState({
    delivery_type: 'no-action',
    appointment_date: '',
    note: '',
    reason: '',
  });

  // constants that display modals
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);

  const [activeImage, setActiveImage] = useState('');

  // bar code
  const [showBar, setShowBar] = useState(false);
  const [barCode, setBarCode] = useState('Leia o código de barras...');

  // include note
  const [showNote, setShowNote] = useState(false);
  const receiptRef = useRef<HTMLInputElement>(null);
  const [receipt, setReceipt] = useState<File | undefined>();
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);

  useEffect(() => {
    if (invoiceId) {
      fetchInvoiceDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId]);

  const fetchInvoiceDetails = async () => {
    try {
      setIsLoadingInvoice(true);

      const { data } = await api.get(`/invoices/${invoiceId}`, {
        params: {
          detailed: true,
        },
      });

      setInvoice(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    } finally {
      setIsLoadingInvoice(false);
    }
  };

  const onBarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setBarCode(value);
  };

  const onBarSubmit = async () => {
    setLoading(true);
    try {
      await api.post(`/invoices/${invoice?.id}/confirm-invoice-access-key`, {
        collection_information_id:
          invoice?.collection_orders?.[0]?.collection_information?.id,
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

  const onBarSelect = () => {
    setShowNote(false);
    setShowBar((prevState) => !prevState);
  };

  const onReceiptChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files?.length > 0) {
      setReceipt(files[0]);

      return;
    }

    setReceipt(undefined);
  };

  const handleReceipt = async () => {
    // implementation placeholder - uncomment and implement when backend ready
    if (receipt && invoice && invoice.id) {
      // const formData = new FormData();
      // formData.append('image', receipt);
      // formData.append('invoice_id', invoice.id);
      // try {
      //   await api.post(`/invoice-receipts`, formData);
      //   toast.success('Nota fiscal adicionada ao pedido com sucesso!')
      // } catch (error: any) {
      //   toast.error(error?.response?.data?.message || 'Opps ocorreu um erro, tente novamente mais tarde!')
      // }
    }
  };

  const getOperators = async () => {
    try {
      const response = await api.get(`/invoices/${invoiceId}/operators`);

      const operatorsResp = response.data || [];

      setOperators(operatorsResp);
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOccurrences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoSelected]);

  useEffect(() => {
    getOperators();
    setOccurrences(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOccurrences = async () => {
    setLoading(true);
    try {
      const response = await api.get(`occurrences`, {
        params: { invoice_id: invoiceId },
      });

      if (response.data && response.data.length) {
        setOccurrences(response.data);
      } else {
        setOccurrences([]);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
      setOccurrences([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDate = (value: any) => {
    if (value) {
      const isoDate = new Date(value._d).toISOString();

      setFreezeInvoice({ ...freezeInvoice, appointment_date: isoDate });
    } else {
      setFreezeInvoice({ ...freezeInvoice, appointment_date: '' });
    }
  };

  const handleError = (error: string) => {
    toast.error(error);
  };

  const saveOccurrence = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append('type', occurrenceData.type);

    if (occurrenceData.invoice_id) {
      formData.append('invoice_id', occurrenceData.invoice_id);
    }

    if (occurrenceData.description) {
      formData.append('description', occurrenceData.description);
    }

    if (occurrenceData.image) {
      formData.append('image', occurrenceData.image);
    }

    try {
      const response = await api.post(`occurrences`, formData);

      if (response) {
        toast.success('Ocorrência adicionada');
        setInfoSelected('incidents-list');
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const saveFreezeInvoice = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`invoices/${invoice?.id}/delivery-type`, freezeInvoice);

      if (response) {
        toast.success('Nota congelada com sucesso!');
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const saveUnFreezeInvoice = async () => {
    setLoading(true);

    try {
      const response = await api.patch(`invoices/${invoice?.id}/delivery-type`, {
        delivery_type: 'normal',
      });

      if (response) {
        toast.success('Nota liberada com sucesso!');
      }

      setInfoSelected('order-info');
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleFreeStorage = async () => {
    try {
      await api.post('/invoices/start-discharge', {
        truck_id: truckId,
      });

      toast.info('Pronto para armazenagem!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    }
  };

  const handleFreeLoading = async () => {
    const truckRouteId = invoice?.route_item?.truck_route?.id || '';

    try {
      await api.put(`/truck-routes/${truckRouteId}/ready`);

      toast.info('Pronto para carregamento!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    }
  };

  const handleFreeLocal = async () => {
    const id = invoice?.id || '';

    try {
      await api.post('local-deliveries', {
        invoice_ids: [id],
      });

      toast.info('Liberado para entrega local!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    }
  };

  const handleFinish = async () => {
    const id = invoice?.id || '';

    try {
      await api.patch(`invoice-status/${id}/finish-invoice`);

      toast.info('Finalizado!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    }
  };

  const setLocalDelivery = async () => {
    setLoading(true);

    try {
      const response = await api.patch(`invoices/${invoice?.id}/delivery-type`, { delivery_type: 'local' });

      if (response) {
        toast.success('Alteração salva com sucesso!');
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleSketch = async (id: string | undefined) => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await api.put(`invoices/${id}/collect`);

      if (response) {
        toast.success('Nota liberada com sucesso');
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteInvoice = async () => {
    try {
      await api.delete(`/invoices/${invoice?.id}`);

      toast.success('Pedido excluído com sucesso!');

      onDeleteInvoice();
    } catch (error: any) {
      handleError(error?.response?.data?.message || error?.message);
    }
  };

  const handleDeleteInvoice = () => {
    setShowConfirmModal(true);
  };

  const renderOrderInformations = () => {
    return (
      <>
        <div className="order-info__table-wrapper">
          <Table className="table">
            <thead>
              <tr>
                <th>N° do Pedido</th>

                <th>Situação</th>

                <th>Cliente</th>

                <th>Endereço da entrega</th>

                <th>N° da nota</th>

                <th>Último operador</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="N° do Pedido">{invoice?.order_number}</td>

                <td data-label="Situação">{invoice?.status}</td>

                <td data-label="Cliente">{invoice?.client_name}</td>

                <td data-label="Endereço de entrega">{invoice?.address}</td>

                <td data-label="N° da nota">{invoice?.formatted_invoice}</td>

                <td data-label="Nome do operador">
                  <span className="table__information-span">
                    {invoice?.invoice_operators && invoice?.invoice_operators.length > 0 &&
                      invoice.invoice_operators[invoice.invoice_operators.length - 1].user?.individual_person?.name}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="order-info__table-wrapper__buttons-wrapper">
            <AddButton onClick={() => setInfoSelected('add-incident')}>
              Adicionar ocorrências
            </AddButton>
            <SeeMoreButton onClick={() => setInfoSelected('incidents-list')}>
              Ver ocorrências
            </SeeMoreButton>
          </div>
        </div>

        <div className="order-info__titled-table-wrapper">
          <span className="order-info__table-title">Liberação de Volumes</span>

          <div className="order-info__table-wrapper">
            <Table className="table">
              <thead>
                <tr>
                  <th>Inconsistência</th>

                  <th>Quantidade de etiquetas lidas</th>

                  <th>Operações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Inconsistência">
                    {invoice?.amount_boxes !== invoice?.amount_read_labels ? (
                      <img className="table__status-icon" src={caution_icon} alt="inconsitência" />
                    ) : (
                      <img className="table__status-icon" src={success_icon} alt="sucesso" />
                    )}
                  </td>

                  <td data-label="Qtde de etiquedas lidas">
                    {invoice?.amount_read_labels || '00'}/{invoice?.amount_boxes}
                  </td>

                  <td data-label="Operações">
                    <span className="table__actions-wrapper">
                      <span className="table__actions-wrapper__action free-item" onClick={() => handleSketch(invoice && invoice.id)}>
                        Pular coleta
                      </span>

                      <span className="table__actions-wrapper__action free-item" onClick={() => handleFreeStorage()}>
                        Pular armazém
                      </span>

                      <span className="table__actions-wrapper__action free-item" onClick={() => handleFreeLoading()}>
                        Pular carregamento
                      </span>

                      <span className="table__actions-wrapper__action free-item" onClick={() => handleFinish()}>
                        Finalizar entrega
                      </span>

                      <span className="table__actions-wrapper__action free-item" onClick={() => handleFreeLocal()}>
                        Liberar entrega local
                      </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {showNote && (
            <div className="order-info__buttons">
              <ActionButton className="action-button--local-delivery" disabled={loading} onClick={() => receiptRef?.current?.click()}>
                {receipt ? receipt.name : 'Selecione o arquivo'}
              </ActionButton>
              <input type="file" ref={receiptRef} style={{ display: 'none' }} onChange={onReceiptChange} />

              <ActionButton className="action-button--withheld-invoice" disabled={loading} onClick={handleReceipt}>
                {loading ? 'Editando...' : 'Salvar'}
              </ActionButton>
            </div>
          )}

          {showBar && (
            <div className="order-info__buttons">
              <input type="text" onChange={onBarChange} className="action-input__barcode" placeholder="Digite o código de barras" />

              <ActionButton className="action-button--withheld-invoice" disabled={loading} onClick={onBarSubmit}>
                {loading ? 'Editando...' : 'Salvar'}
              </ActionButton>
            </div>
          )}

          <div className="order-info__buttons">
            <ActionButton className="action-button--withheld-invoice" disabled={loading} onClick={() => setShowBoxes(true)}>
              Ver caixas
            </ActionButton>

            {!invoice?.invoice_number && (
              <ActionButton className="action-button--local-delivery" disabled={loading} onClick={() => onBarSelect()}>
                Ler código de barras
              </ActionButton>
            )}

            <ActionButton className="action-button--delete" disabled={loading} onClick={handleDeleteInvoice}>
              Excluir pedido
            </ActionButton>

            <ActionButton className="action-button--local-delivery" disabled={loading} onClick={() => setLocalDelivery()}>
              {loading ? 'Editando...' : 'Entrega Local'}
            </ActionButton>

            <ActionButton className="action-button--withheld-invoice" onClick={() => {
                if (invoice?.delivery_type === 'no-action') {
                  setInfoSelected('unfreeze-invoice');
                } else {
                  setInfoSelected('freeze-invoice');
                }
              }}>
              {invoice?.delivery_type === 'no-action' ? 'Liberar nota' : 'Reter nota'}
            </ActionButton>
          </div>
        </div>
      </>
    );
  };

  const renderIncidents = () => {
    return (
      <Incidents>
        <Goback src={left_arrow} alt="voltar" onClick={() => setInfoSelected('order-info')} />

        <div className="incidents__title">Ocorrências</div>

        <Table className="table">
          <thead>
            <tr>
              <th>Data</th>

              <th>Tipo de ocorrencia</th>

              <th>Observação</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {occurrences && occurrences.length > 0 ? (
              occurrences.map((occ, idx) => {
                return (
                  <tr key={occ.id || idx}>
                    <td data-label="Data">{new Date(occ.updated_at).toLocaleString()}</td>

                    <td data-label="Tipo de ocorrência">{occ.type}</td>

                    <td data-label="Observação">{occ.description}</td>

                    {occ.image_url && (
                      <td data-label="Image">
                        <button
                          type="button"
                          className="occurrence-image__button"
                          onClick={() => {
                            setActiveImage(occ.image_url || '');
                            setInfoSelected('incident-image');
                          }}
                        >
                          Ver imagem
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>Nenhuma ocorrência encontrada</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Incidents>
    );
  };

  const renderIncidentImage = () => {
    return (
      <Incidents>
        <Goback src={left_arrow} alt="voltar" onClick={() => setInfoSelected('incidents-list')} />
        {activeImage ? <img src={activeImage} alt="Occurrence" className="incident__image" /> : <div>Nenhuma imagem</div>}
      </Incidents>
    );
  };

  const renderAddIncident = () => {
    return (
      <AddIncident className="new-incident">
        <Goback src={left_arrow} alt="voltar" onClick={() => setInfoSelected('order-info')} />

        <div className="add-incident__title">Nova ocorrencia de pedido</div>

        <div className="add-incident__field-group">
          <Label className="field-label">
            Tipo de ocorrência
            <input type="text" className="field-label__input" onChange={(e) => setOccurrenceData({ ...occurrenceData, type: e.target.value })} />
          </Label>
        </div>

        <div className="add-incident__field-group">
          <Label className="field-label extended">
            Descrição
            <input type="text" className="field-label__input" onChange={(e) => setOccurrenceData({ ...occurrenceData, description: e.target.value })} />
          </Label>
        </div>

        <div className="add-incident__field-group">
          <Label className="field-label extended">
            Imagem
            <p className="field-label-value">{occurrenceData?.image ? occurrenceData?.image?.name : 'Selecione a imagem'}</p>
            <input
              type="file"
              style={{ display: 'none' }}
              className="field-label__input"
              onChange={(e) => {
                const files = e.target.files;

                if (files && files.length > 0) {
                  setOccurrenceData((prevState) => ({ ...prevState, image: files[0] }));
                  return;
                }

                setOccurrenceData((prevState) => ({ ...prevState, image: undefined }));
              }}
            />
          </Label>
        </div>

        <SaveButton disabled={loading} onClick={() => saveOccurrence()}>
          <HiBadgeCheck size={24} />
          {loading ? 'Salvando...' : 'Salvar'}
        </SaveButton>
      </AddIncident>
    );
  };

  const renderOrderOperatorsList = () => {
    return (
      <OrderOperators className="order-operators ">
        <div className="order-operators__title">Usuários operadores de pedido</div>

        <Table className="table">
          <thead>
            <tr>
              <th>Data</th>

              <th>Operador</th>

              <th>Tipo de operação</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {operators && operators.length > 0 ? (
              operators.map((item, idx) => (
                <tr key={item.updated_at + idx}>
                  <td data-label="Data">{dateMask(item?.updated_at)}</td>

                  <td data-label="Operador">{item?.user?.individual_person?.name}</td>

                  <td data-label="Tipo de operação">{item?.step}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Nenhuma operação encontrada!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </OrderOperators>
    );
  };

  const renderFreezeInvoice = () => {
    return (
      <AddIncident className="new-incident">
        <Goback src={left_arrow} alt="voltar" onClick={() => setInfoSelected('order-info')} />

        <div className="add-incident__title">Reter nota</div>

        <div className="add-incident__field-group">
          <Label className="field-label">
            Motivo
            <input type="text" className="field-label__input" onChange={(e) => setFreezeInvoice({ ...freezeInvoice, note: e.target.value })} />
          </Label>

          <Label className="field-label">
            Data do agendamento
            <DatePicker onChange={handleDate} placeholder="dd/mm/aaa" format={dateFormat} showToday={false} locale={locale} showTime={{ format: 'HH:mm' }} />
          </Label>
        </div>

        <div className="add-incident__field-group">
          <Label className="field-label extended">
            Observação
            <input type="text" className="field-label__input" onChange={(e) => setFreezeInvoice({ ...freezeInvoice, reason: e.target.value })} />
          </Label>
        </div>

        <SaveButton onClick={() => saveFreezeInvoice()}>
          <HiBadgeCheck size={24} />
          Reter nota
        </SaveButton>
      </AddIncident>
    );
  };

  const renderUnfreezeInvoice = () => {
    const occurrence = occurrences && occurrences.length ? occurrences[occurrences.length - 1] : undefined;

    return (
      <AddIncident className="new-incident">
        <Goback src={left_arrow} alt="voltar" onClick={() => setInfoSelected('order-info')} />

        <div className="add-incident__title">Liberar nota</div>

        <div className="add-incident__field-group">
          <Label className="field-label">
            Motivo
            <input type="text" className="field-label__input" defaultValue={occurrence?.description} disabled />
          </Label>

          <Label className="field-label">
            Data do agendamento
            <DatePicker placeholder="dd/mm/aaa" format={'DD/MM/YYYY HH:mm'} showToday={false} locale={locale} disabled defaultValue={moment(invoice?.appointment_date)} />
          </Label>
        </div>

        <div className="add-incident__field-group">
          <Label className="field-label extended">
            Observação
            <input type="text" className="field-label__input" defaultValue={occurrence?.type} disabled />
          </Label>
        </div>

        <SaveButton onClick={() => saveUnFreezeInvoice()}>
          <HiBadgeCheck size={24} />
          Liberar nota
        </SaveButton>
      </AddIncident>
    );
  };

  const boxSelection = () => {
    return (
      <>
        <Goback src={left_arrow} alt="voltar" onClick={() => setInfoSelected('order-info')} />
        <BoxSelect disableSelect={false} edit={false} invoiceID={invoice?.id} />
      </>
    );
  };

  const handleSelectedInfo = (info: string) => {
    const panel: { [key: string]: any } = {
      'order-info': renderOrderInformations(),
      'incidents-list': renderIncidents(),
      'incident-image': renderIncidentImage(),
      'add-incident': renderAddIncident(),
      'order-operators-list': renderOrderOperatorsList(),
      'add-boxes': boxSelection(),
      'freeze-invoice': renderFreezeInvoice(),
      'unfreeze-invoice': renderUnfreezeInvoice(),
    };

    return panel[info];
  };

  if (isLoadingInvoice) {
    return null;
  }

  return (
    <Container className="order-details">
      <Close className="close" onClick={() => setShowOrderDetails(false)}>{'\u00D7'}</Close>

      <OrderInfo className="order-info">
        <div className="order-info__buttons-wrapper">
          <div className={`order-info__tab-button ${infoSelected !== 'order-operators-list' ? 'active' : ''}`} onClick={() => setInfoSelected('order-info')}>
            Prontuário do Pedido
          </div>

          <div className={`order-info__tab-button ${infoSelected === 'order-operators-list' ? 'active' : ''}`} onClick={() => setInfoSelected('order-operators-list')}>
            Usuários Operadores
          </div>
        </div>

        {handleSelectedInfo(infoSelected)}
      </OrderInfo>

      {showConfirmModal && (
        <ConfirmModal
          title="Tem certeza que deseja excluir esse pedido?"
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmDeleteInvoice}
          cancelText="Cancelar"
          confirmText="Excluir"
        />
      )}

      {showBoxes && (
        <InfoModal key="get-boxes-modal" openModal={showBoxes} setOpenModal={setShowBoxes}>
          <BoxesList invoiceID={invoice?.id} setShowOrderDetails={setShowBoxes} />
        </InfoModal>
      )}
    </Container>
  );
};

export default OrderDetails;
