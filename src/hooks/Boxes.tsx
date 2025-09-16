import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./Auth";

interface Boxes {
  id: string;
  name: string;
}

interface BoxesContextData {
  boxes: Boxes[];
  setBoxes: React.Dispatch<React.SetStateAction<Boxes[]>>;
}

interface Props {
  children: ReactNode;
}

const BoxesContext = createContext<BoxesContextData>({} as BoxesContextData);

const BoxesProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const [boxes, setBoxes] = useState<Boxes[]>([]);

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
