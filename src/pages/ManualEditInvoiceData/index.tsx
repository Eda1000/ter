import { useState } from 'react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Stepper } from '../../components/Stepper';
import { BoxSelect } from '../../components/BoxSelect';

import { OrderForm } from './components/OrderForm';
import { Confirm } from './components/Confirm';
import { Positions } from './components/Positions';
import { Status } from './components/Status';

import { Container, Content, ContentCard } from './styles';

export const ManualCreate = () => {
  const [step, setStep] = useState(0);

  const [invoiceID, setInvoiceID] = useState<string>('');

  function setStepperStep(step: number) {
    setStep(step);
  }

  return (
    <>
      <Header />
      <Sidebar />

      <Container>
        <Content>
          <h1>Pedido</h1>

          <ContentCard>
            <Stepper step={step} setStep={setStep} />

            <form>
              {step === 0 ? (
                <OrderForm setStep={setStepperStep} setOrderID={setInvoiceID} />
              ) : (
                <></>
              )}

              {step === 1 ? (
                <BoxSelect
                  setStep={setStepperStep}
                  invoiceID={invoiceID}
                  edit={false}
                  disableSelect={false}
                />
              ) : (
                <></>
              )}

              {step === 2 ? (
                <Confirm setStep={setStepperStep} invoiceID={invoiceID} />
              ) : (
                <></>
              )}

              {step === 3 ? (
                <Positions setStep={setStepperStep} invoiceID={invoiceID} />
              ) : (
                <></>
              )}

              {step === 4 ? <Status invoiceID={invoiceID} /> : <></>}
            </form>
          </ContentCard>
        </Content>
      </Container>
    </>
  );
};
