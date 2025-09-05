import {
  Button,
  ButtonsContainer,
  ConfirmButton,
  Container,
  Content,
  Title,
} from './_confirmModal';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  onClose,
  onConfirm,
  title,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: Props) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>

        <ButtonsContainer>
          <Button type="button" onClick={onClose}>
            {cancelText}
          </Button>
          <ConfirmButton type="button" onClick={onConfirm}>
            {confirmText}
          </ConfirmButton>
        </ButtonsContainer>
      </Content>
    </Container>
  );
};
