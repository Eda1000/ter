import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { BoxSelect } from '../../components/BoxSelect';

import add_icon from '../../assets/general/plus_icon.svg';

import {
  Container,
  Content,
  AddNewPositionButton,
  PageTitle,
  TitleRow,
  BackgroundShadow,
} from './styles';

export const ListBoxes = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Caixas</PageTitle>

            <Link to="/adicionar-caixas">
              <AddNewPositionButton>
                <img src={add_icon} alt="ícone de adicionar" />
                <span>Nova</span>
              </AddNewPositionButton>
            </Link>
          </TitleRow>

          <BackgroundShadow>
            <BoxSelect disableSelect={true} edit={true} />
          </BackgroundShadow>
        </Content>
      </Container>
    </>
  );
};
