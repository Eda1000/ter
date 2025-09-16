import React, { ReactNode } from "react";
import { Wrapper } from "./styles";

interface Props {
  children: ReactNode;
}

export const PaginationContainer: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
