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

export const AddInvoiceStatus = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Cadastrar Status</PageTitle>
            <Link to="/notas-fiscais">
              <ShowAllStatusButton>Ver todos os Status</ShowAllStatusButton>
            </Link>
          </TitleRow>

          <Informations>
            <InfoGroup>
              <Label>
                Nome
                <Input />
              </Label>
              <Label>
                Descrição
                <Input />
              </Label>
            </InfoGroup>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              <SaveButton>
                <HiBadgeCheck size={24} />
                Salvar Status
              </SaveButton>
              <Link to="/notas-fiscais">
                <BackButton>Voltar</BackButton>
              </Link>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
