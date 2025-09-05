import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import add_icon from '../../assets/general/plus_icon.svg';
import { HiBadgeCheck } from 'react-icons/hi';

import { InfoModal } from '../../components/Modal';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import {
  AddRuleContainer,
  BackButton,
  ButtonsWrapper,
  ConfirmButton,
  Container,
  Content,
  DeleteButton,
  FeedBackTableRow,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  ModalButtonsWrapper,
  ModalContent,
  ModalInformations,
  ModalLabel,
  ModalTitle,
  NewAreaButton,
  PageTitle,
  RulesTitleRow,
  SaveButton,
  ShowAllAreasButton,
  Table,
  TableWrapper,
  TextArea,
  TitleRow,
} from './styles';

export const EditArea = () => {
  const [hasRules, setHasRules] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [areaName, setAreaName] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [ruleName, setRuleName] = useState<string>('');
  const [rulePriority, setRulePriority] = useState<string>('');
  const [initialZipCode, setInitialZipCode] = useState<string>('');
  const [finalZipCode, setFinalZipCode] = useState<string>('');

  useEffect(() => {
    fetchAreaData();
  }, []);

  const fetchAreaData = () => {
    // fethdatafunction
    fillAreaData();
  };

  const fillAreaData = () => {
    setAreaName('Centro - centro – sé /santa efigênia /república / centro');
    setPriority('10');
    setRuleName('Centro - centro – sé /santa efigênia /república / centro');
    setRulePriority('10');
    setInitialZipCode('01000-000');
    setFinalZipCode('01099-001');
  };

  const renderRules = () => {
    if (hasRules) {
      return (
        <>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Prioridade</th>
                <th>CEP Inicial</th>
                <th>CEP Final</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Nome">
                  <p>
                    Centro - centro – sé / santa efigênia / república / centro
                  </p>
                </td>
                <td data-label="Prioridade">
                  <span>10</span>
                </td>
                <td data-label="CEP Inicial">
                  <span>01000-000</span>
                </td>
                <td data-label="CEP Final">01099-001</td>
              </tr>
            </tbody>
          </Table>
        </>
      );
    } else {
      return (
        <>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Prioridade</th>
                <th>CEP Inicial</th>
                <th>CEP Final</th>
              </tr>
            </thead>
            <tbody>
              <FeedBackTableRow>
                <td data-label="Nome">
                  <p></p>
                </td>
                <td data-label="Prioridade">
                  <span>Nenhum resultado</span>
                </td>
                <td data-label="CEP Inicial">
                  <span></span>
                </td>
                <td data-label="CEP Final"></td>
              </FeedBackTableRow>
            </tbody>
          </Table>
        </>
      );
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Cadastrar Região</PageTitle>

            <Link to="/regioes">
              <ShowAllAreasButton>Ver todos as regiões</ShowAllAreasButton>
            </Link>
          </TitleRow>

          <Informations>
            <InfoGroup>
              <Label>
                Nome
                <TextArea defaultValue={areaName} />
              </Label>
              <Label>
                Prioridade
                <Input defaultValue={priority} />
              </Label>
            </InfoGroup>

            <AddRuleContainer>
              <RulesTitleRow>
                <PageTitle>Regras</PageTitle>
                <NewAreaButton onClick={() => setShowModal(!showModal)}>
                  <img src={add_icon} alt="ícone de adicionar" />
                  <span>Criar</span>
                </NewAreaButton>
              </RulesTitleRow>

              <TableWrapper>{renderRules()}</TableWrapper>
            </AddRuleContainer>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              <SaveButton>
                <HiBadgeCheck size={24} />
                Salvar
              </SaveButton>
              <BackButton>Voltar</BackButton>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>

      <InfoModal setOpenModal={setShowModal} openModal={showModal}>
        <ModalContent>
          <ModalTitle>Regra</ModalTitle>

          <ModalInformations>
            <InfoGroup>
              <ModalLabel>
                Nome
                <TextArea defaultValue={ruleName} />
              </ModalLabel>
              <ModalLabel>
                Prioridade
                <Input defaultValue={rulePriority} />
              </ModalLabel>
            </InfoGroup>

            <InfoGroup>
              <ModalLabel>
                Cep Inicial
                <Input defaultValue={initialZipCode} />
              </ModalLabel>
              <ModalLabel>
                Cep final (opcional)
                <Input defaultValue={finalZipCode} />
              </ModalLabel>
            </InfoGroup>
          </ModalInformations>

          <ModalButtonsWrapper>
            <ConfirmButton>
              <HiBadgeCheck size={24} />
              Confirmar
            </ConfirmButton>
            <BackButton>Voltar</BackButton>
            <DeleteButton>Remover</DeleteButton>
          </ModalButtonsWrapper>
        </ModalContent>
      </InfoModal>
    </>
  );
};
