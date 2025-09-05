import React from 'react';

import { AuthProvider } from './Auth';
import { BoxesProvider } from './Boxes';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <BoxesProvider>{children}</BoxesProvider>
  </AuthProvider>
);

export default AppProvider;
