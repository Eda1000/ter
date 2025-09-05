import React, {
  useContext,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';
import api from '../services/api';

interface CreateAccountContextProps {
  createAccount(
    name: string,
    email: string,
    password: string, 
    passwordConfirmation: string,
    roleId: string,
    
  ): any;
}

const CreateAccountContext = createContext<CreateAccountContextProps>(
  {} as CreateAccountContextProps,
);

const CreateAccountProvider: React.FC = ({ children }) => {
  const createAccount = async (
    name: string,
    email: string,
    password: string, 
    passwordConfirmation: string,
    roleId: string,
  ) => {
    await api.post('/users', { 
      email,
      password,
      password_confirmation: passwordConfirmation,
      individual_user: {name},
      role_id: roleId,
    });
  };

  return (
    <CreateAccountContext.Provider
      value={{ createAccount }}
    >
      {children}
    </CreateAccountContext.Provider>
  );
};

const useCreateAccount = (): CreateAccountContextProps => {
  const context = useContext(CreateAccountContext);

  if (!context) {
    throw new Error('userAuth must be used within an CreateAccountProvider');
  }

  return context;
};

export { CreateAccountProvider, useCreateAccount };