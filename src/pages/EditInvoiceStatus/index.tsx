import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HiBadgeCheck } from 'react-icons/hi';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
  BackButton,
  ButtonsWrapper,
  Container,
  Content,
  DeleteButton,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  SaveButton,
  ShowAllStatusButton,
  TitleRow,
} from './styles';

export const EditInvoiceStatus = () => {
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [invoiceStatus, setInvoiceStatus] = useState<string>('');

  useEffect(() => {
    fetchInvoice('id');
  }, []);

  const fetchInvoice = (id: any) => {
    console.log('call api ;D ', id);
    fillInvoiceData();
  };

  const fillInvoiceData = () => {
    setInvoiceNumber('221764');
    setInvoiceStatus('Descrição da nota ');
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Editar Status</PageTitle>
            <Link to="/notas-fiscais">
              <ShowAllStatusButton>Ver todos os Status</ShowAllStatusButton>
            </Link>
          </TitleRow>
          <Informations>
            <InfoGroup>
              <Label>
                Nome
                <Input defaultValue={invoiceNumber} />
              </Label>
              <Label>
                Descrição
                <Input defaultValue={invoiceStatus} />
              </Label>
            </InfoGroup>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              <SaveButton>
                <HiBadgeCheck size={24} />
                Salvar Status
              </SaveButton>
              <BackButton to="/notas-fiscais">Voltar</BackButton>
            </MainButtons>
            <DeleteButton>Excluir</DeleteButton>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
