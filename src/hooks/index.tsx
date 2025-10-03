import React from 'react';

import { AuthProvider } from './Auth';
import { BoxesProvider } from './Boxes';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <AuthProvider>
    <BoxesProvider>{children}</BoxesProvider>
  </AuthProvider>
);

export default AppProvider;
