import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CloseButton, Container, Content, Input, SaveButton } from './styles';

interface Props {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onSuccessfulRead: (barCode: string) => void;
}

export const SendModal = ({ error, setError, onClose, onSuccessfulRead }: Props) => {
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
          onChange={(e) => {
            setError(false);
            setBarCode(e.target.value)
          }}
          error={error}
          placeholder="Digite a nota fiscal"
        />
        <SaveButton>Consultar</SaveButton>
      </Content>
    </Container>
  );
};
