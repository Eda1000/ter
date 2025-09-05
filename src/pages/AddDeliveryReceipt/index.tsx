import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { HiBadgeCheck } from 'react-icons/hi';
import clip_icon from '../../assets/general/clip_icon.svg';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
  BackButton,
  ButtonsWrapper,
  Container,
  FormWrapper,
  FileInstruction,
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

import { useAuth } from '../../hooks/Auth';
import { toast } from 'react-toastify';

interface IReceiptFormData {
  name: string;
  invoice_number: string;
  image: File | undefined;
}

export const AddDeliveryReceipt = () => {
  const { data } = useAuth();

  const [receiptFormData, setReceiptFormData] = useState({} as IReceiptFormData)

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    for (var [key, value] of Object.entries(receiptFormData)) {
      formData.append(key, value);
    }

    api.post('/invoice-receipts', formData,{
      headers: {
       'Authorization': `Bearer ${data.access_token}`,
        'Content-type': 'multipart/form-data'
      }
    }).then((response) => {
      toast.success('Comprovante salvo com sucesso!')
    }).catch((err) => {
      toast.error(err.response?.data?.message || err.toString())
    })
  }, [receiptFormData, data.access_token])

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fileList = event.target.files;

    if (fileList) {
      setReceiptFormData(prevState=> ({
        ...prevState,
        image: fileList[0]
      }))
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <FormWrapper onSubmit={handleSubmit}>
          <TitleRow>
            <PageTitle>Cadastro de comprovantes</PageTitle>
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
                  onChange={(event) => setReceiptFormData(prevState => ({
                    ...prevState,
                    name: event.target.value
                  }))}
                />
              </Label>
              <Label>
                Informe o nº da Nota Fiscal
                <Input
                  value={receiptFormData.invoice_number}
                  onChange={(event) => setReceiptFormData(prevState => ({
                    ...prevState,
                    invoice_number: event.target.value
                  }))}
                />
              </Label>
            </InfoGroup>
          </Informations>

          <SendFileWrapper>
            <FileInstruction>Importe a imagem do canhoto</FileInstruction>
            <SendFileButton>
              <input
                type="file"
                onChange={(event) => handleImage(event)}
              />
              <img src={clip_icon} alt="ícone de anexar" />
              Anexar imagem
            </SendFileButton>
          </SendFileWrapper>

          <ButtonsWrapper>
            <MainButtons>
              <SaveButton type="submit">
                <HiBadgeCheck size={24} />
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
