import React from "react";
import { Container } from "./styles";

interface BoxAmountProps {
  id: string;
  name: string;
  quantity?: number;
  cubage?: number;
}

const BoxAmount: React.FC<BoxAmountProps> = ({ id, name, quantity, cubage }) => {
  return (
    <Container>
      <h3>{name}</h3>
      <p>Qtd: {quantity ?? 0}</p>
      <p>Cubagem: {cubage ?? 0}</p>
    </Container>
  );
};

export default BoxAmount;
