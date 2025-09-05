import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HiBadgeCheck } from 'react-icons/hi';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
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
  SeeAllPositionsButton,
  TitleRow,
} from './styles';

export const AssociatePosition = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Associar posições</PageTitle>

            <Link to="/todas-as-posicoes">
              <SeeAllPositionsButton>
                Ver todas as posições
              </SeeAllPositionsButton>
            </Link>
          </TitleRow>
          <Informations>
            <InfoGroup>
              <Label>
                Inserir números das notas ficais
                <Input />
              </Label>

              <Label>
                Informar a posição da mercadoria
                <Input />
              </Label>
            </InfoGroup>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              <SaveButton>
                <HiBadgeCheck size={24} />
                Salvar posição
              </SaveButton>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
