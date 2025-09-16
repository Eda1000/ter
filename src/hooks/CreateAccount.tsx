import React, { createContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface CreateAccountContextData {
  createAccount: (name: string, email: string, password: string) => Promise<void>;
}

const CreateAccountContext = createContext<CreateAccountContextData>(
  {} as CreateAccountContextData
);

const CreateAccountProvider: React.FC<Props> = ({ children }) => {
  const createAccount = async (name: string, email: string, password: string) => {
    console.log("Criando conta:", { name, email, password });
  };

  return (
    <CreateAccountContext.Provider value={{ createAccount }}>
      {children}
    </CreateAccountContext.Provider>
  );
};

export { CreateAccountProvider, CreateAccountContext };
