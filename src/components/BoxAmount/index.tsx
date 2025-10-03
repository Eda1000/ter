import React from "react";
import { Container } from "./styles";
import { IBox } from "../../hooks/Boxes";

export interface BoxAmountProps {
  box: IBox;
  amount: number;
  onChangeAmount: (newAmount: number) => void;
}

const BoxAmount: React.FC<BoxAmountProps> = ({ box, amount, onChangeAmount }) => {
  return (
    <Container>
      <h3>{box.name}</h3>
      <p>Qtd: {amount}</p>
      <p>Cubagem: {box.cubage ?? 0}</p>
    </Container>
  );
};

export default BoxAmount;
