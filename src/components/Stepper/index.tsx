import { BsCheckCircleFill } from 'react-icons/bs';
import { FaBoxes, FaTruck } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { Container, Division } from './styles';

interface StepperProps {
  step: number;
  setStep: Function;
}

export const Stepper: React.FC<StepperProps> = ({ step, setStep }) => {
  return (
    <>
      <Container>
        <section
          className={step >= 0 ? 'activeStep' : ''}
          onClick={() => setStep(0)}
        >
          <FaTruck />
          <h3>Caminhão</h3>
          <div />
        </section>

        <section
          className={step >= 1 ? 'activeStep' : ''}
          onClick={() => setStep(1)}
        >
          <FiFileText />
          <h3>Pedido</h3>
          <div />
        </section>
        <section
          className={step >= 2 ? 'activeStep' : ''}
          onClick={() => setStep(2)}
        >
          <FaBoxes />
          <h3>Caixas</h3>
          <div />
        </section>
        <section
          className={step >= 3 ? 'activeStep' : ''}
          onClick={() => setStep(3)}
        >
          <BsCheckCircleFill />
          <h3>Confirmar</h3>
        </section>
      </Container>

      <Division />
    </>
  );
};
