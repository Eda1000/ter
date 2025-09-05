import Modal from 'react-modal';
import React, { Dispatch, SetStateAction } from 'react';

import './modal-responsive.css';

import { Content } from './styles';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children?: any;
}

export const InfoModal = ({ openModal, setOpenModal, children }: Props) => {
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      style={{ overlay: { backgroundColor: 'rgba(142,142,147, 0.6)' } }}
      className="success-modal-responsive"
    >
      <Content>{children}</Content>
    </Modal>
  );
};
