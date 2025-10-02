import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';

import api from '../../services/api';

import * as HiIcons from 'react-icons/hi';
import clip_icon from '../../assets/general/clip_icon.svg';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { toast } from 'react-toastify';

import {
  BackButton,
  ButtonsWrapper,
  Container,
  FileInstruction,
  FileName,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  SaveButton,
  SendFileButton,
  SendFileWrapper,
  ShowAllDeliveryReceiptsButton,
  TitleRow,
} from './styles';
import { FormWrapper } from '../AddDeliveryReceipt/styles';

type EditReceiptParamsType = {
  ReceiptId: string;
}

interface IReceiptFormData {
  id: string
  name: string;
  invoice_number: string;
  invoice:{
    invoice_number: string;
  }
  image: File;
  image_url: string;
}

export const EditDeliveryReceipt = () => {
  const { data } = useAuth();
  const { ReceiptId } = useParams<EditReceiptParamsType>();

  const [receiptFormData, setReceiptFormData] = useState({} as IReceiptFormData)

  useEffect(() => {
    fillDeliverReceiptData();
  }, [ReceiptId]);

  const fillDeliverReceiptData = () => {
    api.get(`invoice-receipts?id=${ReceiptId}`,{
      headers:{ Authorization: `Bearer ${data.access_token}` }
    }).then((response) => {
      setReceiptFormData(response.data.results[0]);

      setReceiptFormData(prevState => ({
        ...prevState,
        invoice_number: prevState.invoice.invoice_number
      }))
    }).catch((err) => {
      toast.error(err.response?.data?.message || err.toString())
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('image', receiptFormData.image);

    api.put(`invoice-receipts/${receiptFormData.id}`, {
      name: receiptFormData.name,
      invoice_number: receiptFormData.invoice_number
    }, {
      headers: {
        Authorization: 'Bearer ' + data.access_token,
      }
    }).then(() => {
      toast.success('Comprovante modificado com sucesso!')
    }).catch((err) => {
      toast.error(err.response?.data?.message || err.toString())
    })

    api.patch(`invoice-receipts/${receiptFormData.id}/image`, formData, {
      headers: {
        Authorization: 'Bearer ' + data.access_token,
      }
    }).then(() => {
      toast.success('Imagem modificado com sucesso!')
    }).catch((err) => {
      toast.error(err.response?.data?.message || err.toString())
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;

    if (fileList) {
      setReceiptFormData(prevState => ({
        ...prevState,
        image: fileList[0]
      }));
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <FormWrapper onSubmit={handleSubmit}>
          <TitleRow>
            <PageTitle>Editar comprovantes</PageTitle>
            <Link to="/comprovantes">
              <ShowAllDeliveryReceiptsButton>
                Ver todos os Comprovantes
              </ShowAllDeliveryReceiptsButton>
            </Link>
          </TitleRow>

          <Informations>
            <InfoGroup>
              <Label>
                Informe o nome do comprovante
                <Input
                  value={receiptFormData.name}
                  onChange={(e) => setReceiptFormData(prevState => ({
                    ...prevState,
                    name: e.target.value,
                  }))}
                />
              </Label>
              <Label>
                Informe o nº da Nota Fiscal
                <Input
                  value={receiptFormData.invoice_number}
                  onChange={(e) => setReceiptFormData(prevState => ({
                    ...prevState,
                    invoice_number: e.target.value,
                  }))}
                />
              </Label>
            </InfoGroup>
          </Informations>

          <ButtonsWrapper>
            <SendFileWrapper>
              <FileInstruction>Importe a imagem do canhoto</FileInstruction>
              <SendFileButton>
                <input type="file" onChange={(e) => handleImageChange(e)} />
                <img src={clip_icon} alt="ícone de anexar" />
                Anexar imagem
              </SendFileButton>
              <FileName>{receiptFormData.image?.name}</FileName>
            </SendFileWrapper>

            <MainButtons>
              <SaveButton type="submit">
                <HiIcons.HiBadgeCheck size={24} />
                Salvar
              </SaveButton>
              <Link to="/comprovantes">
                <BackButton>Voltar</BackButton>
              </Link>
            </MainButtons>
          </ButtonsWrapper>
        </FormWrapper>
      </Container>
      ;
    </>
  );
};
