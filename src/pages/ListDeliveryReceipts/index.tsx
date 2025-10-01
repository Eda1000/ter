import { useState, useEffect, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import add_icon from '../../assets/general/plus_icon.svg';
import magnifying_icon from '../../assets/general/magnifying_icon.svg';
import download_icon from '../../assets/general/download_icon.svg';

import { toast } from 'react-toastify';

import {
  Container,
  Content,
  DownloadWrapper,
  FileName,
  NewDeliveryReceiptButton,
  PageTitle,
  PaginationWrapper,
  ReceipRow,
  SearchBox,
  SearchBoxContainer,
  Table,
  TableWrapper,
  TitleRow,
} from './styles';
import { Pagination } from 'antd';
import { Spinner } from '../../components/Spinner/Spinner';

interface IReceiptsData {
  limit: number;
  total: number;
  results: Array<IReceipt>;
}

interface IReceipt {
  created_at: string;
  id: string;
  image: File;
  image_url: string;
  invoice: {
    invoice_number: string;
    order_number: string;
    client_name: string;
    cubage: string;
    invoice_operators: {
      step: string;
      user:{
        individual_person: {
          name: string;
        }
      }
    }[]
  }
  invoice_id: string;
  name: string;
  updated_at: string;
}

export const ListDeliveryReceipts = () => {
  const { data } = useAuth();
  const navigate = useNavigate();

  const [ receiptsData, setReceiptsData ] = useState({} as IReceiptsData)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ searchInvoice, setSearchInvoice ] = useState('')
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    listInvoiceReceiptsFromAPI()
  },[currentPage,searchInvoice])

  const listInvoiceReceiptsFromAPI = () => {
    setLoading(true);
    const url = searchInvoice === '' ? `invoice-receipts?page=${currentPage}&limit=7` : `invoice-receipts?invoice_number=${searchInvoice}`

    api.get<IReceiptsData>(url,{
      headers:{ Authorization: `Bearer ${data.access_token}` }
    }).then((response) => {
      setReceiptsData(response.data)
    }).catch((err) => {
      handleError(err.response.data?.message || err.toString());
    }).finally(() => setLoading(false))
  }

  const handleError = (err: string) => {
    toast.error(err);
  };

  const handleEditReceipt = (event: MouseEvent<HTMLElement>, receiptId: string) => {
    event.preventDefault()

    navigate(`/editar-comprovante/${receiptId}`)
  }

  const PaginationContainer = () => {
    return (
      <PaginationWrapper>
        <td colSpan={5}>
          <Pagination
            defaultCurrent={currentPage}
            total={receiptsData.total}
            pageSize={7}
            onChange={(e: number) => setCurrentPage(e)}
            hideOnSinglePage
          />
        </td>
      </PaginationWrapper>
    )
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Comprovantes</PageTitle>

            <Link to="/adicionar-comprovante">
              <NewDeliveryReceiptButton>
                <img src={add_icon} alt="ícone de adicionar" />
                <span>Novo</span>
              </NewDeliveryReceiptButton>
            </Link>

            <SearchBoxContainer>
              <SearchBox
                placeholder="Buscar..."
                value={searchInvoice}
                onChange={(e) => setSearchInvoice(e.target.value)}
              />
              <img src={magnifying_icon} alt="ícone de procurar" />
            </SearchBoxContainer>
          </TitleRow>

          <TableWrapper>
            <Table>
            {!loading ? (
              <>
                <thead>
                  <tr>
                    <th>Nome do Cliente</th>
                    <th>Nº da nota fiscal</th>
                    <th>Imagem Canhoto</th>
                  </tr>
                </thead>

                <tbody>
                  {receiptsData?.results?.map((receipt) => {
                    // const operator =  receipt?.invoice?.invoice_operators?.find((findOperator) => (
                    //   findOperator.step === 'Motorista'
                    // ))

                    // const name = operator ?
                    // operator?.user?.individual_person?.name :
                    // receipt?.invoice?.client_name

                    const name = receipt?.invoice?.client_name

                    return(
                    <ReceipRow
                      key={receipt?.id}
                      // onClick={(event) => handleEditReceipt(event, receipt.id)}
                    >
                      <td data-label="Nome do Cliente">{name}</td>
                      <td data-label="Nº da nota fiscal">{receipt?.invoice?.invoice_number}</td>
                      <td data-label="Imagem Canhoto">
                        <DownloadWrapper
                          href={receipt.image_url}
                          download
                          onClick={(event) => event.stopPropagation()}
                        >
                          <FileName>{receipt.image.name}</FileName>
                          <img src={download_icon} alt="ícone fazer download" />
                        </DownloadWrapper>
                      </td>
                    </ReceipRow>
                  )})}
                </tbody>
                {PaginationContainer()}
              </>
            ) : (
              <div style={{ margin: '60px 0 60px 0' }}>
                <Spinner />
              </div>
            )}
            </Table>
          </TableWrapper>
        </Content>
      </Container>
    </>
  );
};
