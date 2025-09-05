import { darken } from 'polished';
import styled from 'styled-components';

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  max-width: 100%;
  width: 100%;
  margin-top: 2.5rem;

  padding: 0 2rem;
`;

export const InformationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const InfoTitle = styled.p`
  color: #002e75;
  font-size: 1rem;
  font-weight: 700;
`;

export const InfoText = styled.p`
  color: #002e75;
  font-size: 0.875rem;
  font-weight: 400;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;

  margin-top: 2.5rem;
  padding: 0 2rem;
`;

export const SaveButton = styled.button`
  border: none;

  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0.5rem;
  padding: 0.75rem 1.25rem;
  max-width: 18rem;
  min-width: 18rem;
  background-color: #3ad40c;

  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;

  color: #fff;
  font-size: 1.25rem;
  font-weight: 500;

  svg {
    font-size: 1.5rem;
  }

  transition: background-color 0.2s;

  &:hover {
    background-color: ${darken(0.2, '#3AD40C')};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.625rem 2rem;

  overflow: hidden;
  background: #fff;
  border: 1px solid #ff0720;
  border-radius: 8px;

  color: #ff0720;
  font-size: 1.25rem;
  font-weight: 500;
  text-overflow: ellipsis;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(0.98);
  }

  &:disabled {
    opacity: 0.9;
  }
`;

export const ReadInvoiceButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.625rem 2rem;

  overflow: hidden;
  background: #fff;
  border: 1px solid var(--blue);
  border-radius: 8px;

  color: var(--blue);
  font-size: 1.25rem;
  font-weight: 500;
  text-overflow: ellipsis;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(0.98);
  }

  &:disabled {
    opacity: 0.9;
  }
`;
