/* eslint-disable @typescript-eslint/no-redeclare */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCheck } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import boxImg from '../../assets/box/box2.png';

import { Container } from './styles';
import { Boxes } from '../../hooks/Boxes';

interface Box {
  id: string;
  quantity: number;
}

interface BoxProps {
  boxData: Boxes;
  totalSelected: number;
  quantity?: number;
  disableSelect?: boolean;
  setTotalCubage: Function;
  totalCubage: number;
  height?: string;
  padding?: string;
  setListOfBoxes: Function;
  listOfBoxes: Box[];
  edit: boolean;
  setInvoiceCubage?: Function;
  changeTotalSelected: (total: number) => void;
}

export const Box: React.FC<BoxProps> = ({
  boxData,
  totalSelected,
  quantity,
  disableSelect,
  setTotalCubage,
  totalCubage,
  listOfBoxes,
  setListOfBoxes,
  edit,
  height,
  padding,
  setInvoiceCubage,
  changeTotalSelected,
}) => {
  const history = useHistory();

  const [amount, setAmount] = useState(0);

  function incrementAmount() {
    setAmount(amount + 1);
    changeTotalSelected(totalSelected + 1);
    setTotalCubage(totalCubage + Number(boxData.cubage));

    AddBoxToListOfBoxes(amount + 1);

    setInvoiceCubage && setInvoiceCubage(totalCubage + Number(boxData.cubage));
  }

  function decreaseAmount() {
    if (amount === 0) {
      toast.error('Impossível selecionar valores menores que 0!');

      return;
    }

    setAmount(amount - 1);
    changeTotalSelected(totalSelected - 1);
    setTotalCubage(totalCubage - Number(boxData.cubage));

    setInvoiceCubage && setInvoiceCubage(totalCubage - Number(boxData.cubage));

    amount - 1 === 0
      ? removeBoxFromListOfBoxes()
      : AddBoxToListOfBoxes(amount - 1);
  }

  function addDefaultSrc(e: any) {
    e.target.src = boxImg;
  }

  const AddBoxToListOfBoxes = (newAmount: number) => {
    const newBoxOnArray = {
      id: boxData.id,
      quantity: newAmount,
    };

    if (listOfBoxes.some((item) => item.id)) {
      let newBoxesArray = [];

      const cleanArray = listOfBoxes.filter((item) => item.id !== boxData.id);
      newBoxesArray = cleanArray;

      newBoxesArray.push(newBoxOnArray);

      setListOfBoxes(newBoxesArray);
    }

    if (!listOfBoxes.some((item) => item.id)) {
      setListOfBoxes((listOfBoxes: Box[]) => [...listOfBoxes, newBoxOnArray]);
    }
  };

  const removeBoxFromListOfBoxes = () => {
    const cleanArray = listOfBoxes.filter((item) => item.id !== boxData.id);

    setListOfBoxes(cleanArray);
  };

  function renderControllers() {
    return (
      <div>
        <button type="button" onClick={decreaseAmount}>
          -
        </button>

        <h3>{amount}</h3>

        <button type="button" onClick={incrementAmount}>
          +
        </button>
      </div>
    );
  }

  const handleClick = () => {
    edit &&
      history.push('/editar-caixas', {
        state: boxData,
      });
  };

  return (
    <Container
      onClick={() => handleClick()}
      height={height}
      padding={padding}
      className={amount > 0 ? 'selected' : ''}
    >
      <div>
        <img
          src={boxData.image_url || boxImg}
          onError={(e) => addDefaultSrc(e)}
          alt={boxData.name}
        />
      </div>

      <section>
        <h2>{boxData.name}</h2>
        <p>
          {boxData.cubage || 0}m³ -{' '}
          {quantity ? quantity : boxData.utilization} {quantity ? 'quantidade' : 'usos'}
        </p>

        {disableSelect !== true && renderControllers()}
      </section>

      <div className="check">
        <FaCheck />
      </div>
    </Container>
  );
};
