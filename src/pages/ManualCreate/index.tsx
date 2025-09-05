import { useState } from 'react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Stepper } from '../../components/Stepper';

import { OrderForm } from './components/OrderForm';

import { ICollectionInformation } from '../../Interfaces/CollectionInformation';
import { Invoice } from '../../Interfaces/HomeInterface';
import { BoxAmountList } from '../../components/BoxAmountList';
import { Boxes } from '../../hooks/Boxes';
import { Finish } from './components/Finish';
import { SelectTruck } from './components/SelectTruck';
import { Container, Content, ContentCard } from './styles';

export const ManualCreate = () => {
  const [step, setStep] = useState(0);

  const [invoice, setInvoice] = useState<Invoice>();
  const [collectionInformation, setCollectionInformation] =
    useState<ICollectionInformation>();
  const [boxes, setBoxes] = useState<Boxes[]>([]);

  return (
    <>
      <Header />
      <Sidebar />

      <Container>
        <Content>
          <h1>Pedido</h1>

          <ContentCard>
            <Stepper step={step} setStep={setStep} />

            <div>
              {step === 0 && (
                <SelectTruck
                  setCollectionInformation={setCollectionInformation}
                  setStep={setStep}
                />
              )}

              {step === 1 && (
                <OrderForm
                  setInvoice={setInvoice}
                  setStep={setStep}
                  collectionInformation={collectionInformation}
                />
              )}

              {step === 2 && (
                <BoxAmountList
                  setStep={setStep}
                  invoice={invoice}
                  setFinalBoxes={setBoxes}
                  setInvoice={setInvoice}
                  amountOfBoxes={invoice?.amount_boxes || 0}
                />
              )}

              {step === 3 && (
                <Finish
                  boxes={boxes}
                  collectionInformation={collectionInformation}
                  initialInvoiceId={invoice?.id}
                  reset={() => {
                    setStep(0);
                    setInvoice(undefined);
                    setCollectionInformation(undefined);
                    setBoxes([]);
                  }}
                />
              )}
            </div>
          </ContentCard>
        </Content>
      </Container>
    </>
  );
};
