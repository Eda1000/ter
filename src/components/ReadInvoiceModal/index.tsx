import { useEffect, useRef, useState } from 'react';
import { CloseButton, Container, Content, Input, SaveButton } from './styles';

interface Props {
  onClose: () => void;
  onSuccessfulRead: (barCode: string) => void;
}

export const ReadInvoiceModal = ({ onClose, onSuccessfulRead }: Props) => {
  const [barCode, setBarCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <Container>
      <Content
        onSubmit={(e) => {
          e.preventDefault();
          onSuccessfulRead(barCode);
        }}
      >
        <CloseButton type="button" onClick={onClose}>
          {'\u00D7'}
        </CloseButton>
        <Input
          ref={inputRef}
          type="text"
          onChange={(e) => setBarCode(e.target.value)}
          placeholder="Digite o código de barras"
        />
        <SaveButton>Salvar</SaveButton>
      </Content>
    </Container>
  );
};
