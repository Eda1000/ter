import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Container, IconWrapper } from "./styles";

// Corrige tipagem do ícone
const CheckIcon = FaCheck as unknown as React.FC;

const BoxAmount: React.FC = () => {
  const [amount, setAmount] = useState(0);

  return (
    <Container>
      <h3>Quantidade: {amount}</h3>
      <button onClick={() => setAmount(amount + 1)}>+</button>
      <button onClick={() => setAmount(amount > 0 ? amount - 1 : 0)}>-</button>

      <IconWrapper isSelected={amount > 0}>
        <CheckIcon />
      </IconWrapper>
    </Container>
  );
};

export default BoxAmount;
