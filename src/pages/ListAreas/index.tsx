import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import add_icon from '../../assets/general/plus_icon.svg';
import magnifying_icon from '../../assets/general/magnifying_icon.svg';

import {
  Container,
  Content,
  NewAreaButton,
  PageTitle,
  SearchBox,
  SearchBoxContainer,
  Table,
  TableWrapper,
  TitleRow,
} from './styles';

export const ListAreas = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Regiões</PageTitle>

            <Link to="/adicionar-regiao">
              <NewAreaButton>
                <img src={add_icon} alt="ícone de adicionar" />
                <span>Nova</span>
              </NewAreaButton>
            </Link>

            <SearchBoxContainer>
              <SearchBox placeholder="Buscar..." />
              <img src={magnifying_icon} alt="ícone de procurar" />
            </SearchBoxContainer>
          </TitleRow>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CEP</th>
                  <th>Prioridade</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td data-label="Nome">
                    Centro - centro – sé / santa efigênia / república / centro
                  </td>
                  <td data-label="CEP">01000-000</td>
                  <td data-label="Prioridade">10</td>
                </tr>

                <tr>
                  <td data-label="Nome">
                    Centro - centro – sé / santa efigênia / república / centro
                  </td>
                  <td data-label="CEP">01000-000</td>
                  <td data-label="Prioridade">10</td>
                </tr>

              </tbody>
            </Table>
          </TableWrapper>
        </Content>
      </Container>
    </>
  );
};
