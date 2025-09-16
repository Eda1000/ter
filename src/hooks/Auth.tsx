import React, { createContext, useContext, useState, ReactNode } from "react";
import api from "../services/api";
import { AxiosResponse, AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{ user: User; token: string }> =
        await api.post("/login", { email, password });

      setUser(response.data.user);
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  const signOut = () => {
    setUser(null);
    api.defaults.headers["Authorization"] = "";
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
