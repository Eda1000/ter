import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import add_icon from '../../assets/general/plus_icon.svg';

import {
  Container,
  Content,
  NewInvoiceButton,
  PageTitle,
  Table,
  TableWrapper,
  TitleRow,
} from './styles';

export const ListInvoicesStatus = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Status da nota fiscal</PageTitle>
            <Link to="/adicionar-status-da-nota-fiscal">
              <NewInvoiceButton>
                <img src={add_icon} alt="ícone de adicionar" />
                <span>Novo</span>
              </NewInvoiceButton>
            </Link>
          </TitleRow>
          <TableWrapper>
            <Table>
              <thead>
                <th>Nome</th>
                <th>Descrição</th>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Nome">Cubagem</td>
                  <td data-label="Descrição">
                    <p></p>
                    NF aguardando carta de correção
                  </td>
                </tr>
                <tr>
                  <td data-label="Nome">Imposto</td>
                  <td data-label="Descrição">
                    <p>
                      NF aguardando guias e comprovantes de pagamento de
                      impostos
                    </p>
                  </td>
                </tr>
                <tr>
                  <td data-label="Nome">Carga fracionada SP</td>
                  <td data-label="Descrição">
                    <p>NF aguardando programação de entrega</p>
                  </td>
                </tr>
                <tr>
                  <td data-label="Nome">Retorno de NF</td>
                  <td data-label="Descrição">
                    <p>NF que retornaram com ocorrência de entregas</p>
                  </td>
                </tr>
                <tr>
                  <td data-label="Nome">Agendamento</td>
                  <td data-label="Descrição">
                    <p>
                      NF aguardando agendamento de data de entrega ou agendadas
                    </p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </TableWrapper>
        </Content>
      </Container>
    </>
  );
};
