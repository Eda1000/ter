import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import boxImg from "../../assets/box/box2.png";
import { Container, BoxImage, Button } from "./styles";

const Box: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const handleSelect = () => {
    setSelected(!selected);
    toast.success("Caixa selecionada!");
  };

  const handleNext = () => {
    if (!selected) {
      toast.error("Selecione a caixa primeiro!");
      return;
    }
    navigate("/home");
  };

  return (
    <Container>
      <BoxImage src={boxImg} alt="Box" />
      <Button selected={selected} onClick={handleSelect}>
        <FaCheck /> Selecionar
      </Button>
      <Button onClick={handleNext}>Próximo</Button>
    </Container>
  );
};

export default Box;
