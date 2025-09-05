import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import api from '../../services/api';
import { Button, Container, Content, PageTitle, TitleRow } from './styles';

export const ClearInvoices = () => {
  const confirmClearInvoices = async () => {
    try {
      await api.delete('/invoices/all');

      toast.success('Notas apagadas com sucesso!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    }
  };

  const handleClearInvoices = () => {
    window.confirm('Tem certeza que deseja limpar as notas?') &&
      confirmClearInvoices();
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Limpar notas</PageTitle>
          </TitleRow>
          <Button type="button" onClick={handleClearInvoices}>
            Limpar notas
          </Button>
        </Content>
      </Container>
    </>
  );
};
