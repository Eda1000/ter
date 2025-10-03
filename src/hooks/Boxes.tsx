import React, { createContext, useContext, useState, ReactNode } from "react";

export interface IBox {
  id: string;
  name: string;
  quantity?: number;
  cubage?: number;
}

interface BoxesContextData {
  boxes: IBox[];
  setBoxes: React.Dispatch<React.SetStateAction<IBox[]>>;
  fetchBoxes?: any;
  fetchBoxesCreateAt?: any;
  fetchBoxesUtilization?: any;
  searchBoxes?: any;
  orderFilter?: any;
  createdAtFilterApi?: any;
  createdAtFilterState?: any;
  utilizationFilterApi?: any;
  utilizationFilterState?: any;
  boxesSearch?: any;
  setBoxesSearch?: any;
  loading?: boolean;
  total?: number;
}

interface Props {
  children: ReactNode;
}

const BoxesContext = createContext<BoxesContextData>({} as BoxesContextData);

const BoxesProvider: React.FC<Props> = ({ children }) => {
  const [boxes, setBoxes] = useState<IBox[]>([]);

  return (
    <BoxesContext.Provider value={{ boxes, setBoxes }}>
      {children}
    </BoxesContext.Provider>
  );
};

function useBoxes(): BoxesContextData {
  return useContext(BoxesContext);
}

export { BoxesProvider, useBoxes };

export type Boxes = IBox;

// Add placeholder context data properties for extended functionality
export interface ExtendedBoxesContextData extends BoxesContextData {
  fetchBoxes?: any;
  fetchBoxesCreateAt?: any;
  fetchBoxesUtilization?: any;
  searchBoxes?: any;
  orderFilter?: any;
  createdAtFilterApi?: any;
  createdAtFilterState?: any;
  utilizationFilterApi?: any;
  utilizationFilterState?: any;
  boxesSearch?: any;
  setBoxesSearch?: any;
  loading?: boolean;
  total?: number;
}
