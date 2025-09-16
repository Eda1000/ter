import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import boxImg from "../../assets/box.png";
import { Container, BoxImage, Button } from "./styles";

// Corrige tipagem do ícone
const CheckIcon = FaCheck as unknown as React.FC;

const Box: React.FC = () => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };

  const handleNext = () => {
    console.log("Próximo box selecionado");
  };

  return (
    <Container>
      <BoxImage src={boxImg} alt="Box" />
      <Button selected={selected} onClick={handleSelect}>
        <CheckIcon /> Selecionar
      </Button>
      <Button onClick={handleNext}>Próximo</Button>
    </Container>
  );
};

export default Box;
