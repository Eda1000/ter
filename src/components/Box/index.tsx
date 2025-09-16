import React from "react";
import { Container } from "./styles";
import boxImg from "../../assets/box.png";

interface BoxProps {
  title: string;
  onClick?: () => void;
}

const Box: React.FC<BoxProps> = ({ title, onClick }) => {
  return (
    <Container onClick={onClick}>
      <img src={boxImg} alt="box" />
      <p>{title}</p>
    </Container>
  );
};

export default Box;
