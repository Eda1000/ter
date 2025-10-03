import React from "react";
import { Container } from "./styles";
import boxImg from "../../assets/box.png";
import { IBox } from "../../hooks/Boxes";

export interface BoxProps {
  boxData: IBox;
  disableSelect?: boolean;
  changeTotalSelected?: (total: number) => void;
  totalSelected?: number;
  setTotalCubage?: React.Dispatch<React.SetStateAction<number>>;
  totalCubage?: number;
  addBox?: (box: IBox) => void;
  removeBox?: (id: string) => void;
  edit?: boolean;
  setListOfBoxes?: any;
  listOfBoxes?: any;
  height?: string;
  padding?: string;
  setInvoiceCubage?: any;
  quantity?: number;
  [key: string]: any;
}

const Box: React.FC<BoxProps> = ({ boxData }) => {
  return (
    <Container>
      <img src={boxImg} alt="box" />
      <p>{boxData.name}</p>
    </Container>
  );
};

export default Box;
