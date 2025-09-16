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
