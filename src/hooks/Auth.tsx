import React, { createContext, useContext, useState, ReactNode } from "react";
import api from "../services/api";
import { AxiosResponse, AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role?: {
    name: string;
  };
}

interface AuthState {
  access_token: string;
  user: User | null;
  saveLogin: boolean;
}

interface SignInParams {
  email: string;
  password: string;
  saveLogin: boolean;
}

interface AuthContextData {
  user: User | null;
  data: AuthState;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  refreshToken: () => Promise<void>;
  setTokenOnApiHeaders: (token: string) => void;
  setData: React.Dispatch<React.SetStateAction<AuthState>>;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<AuthState>(() => {
    const storedData = localStorage.getItem('@App:auth');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.access_token) {
        api.defaults.headers.Authorization = `Bearer ${parsedData.access_token}`;
      }
      return parsedData;
    }
    return {
      access_token: '',
      user: null,
      saveLogin: false,
    };
  });

  const signIn = async ({ email, password, saveLogin }: SignInParams) => {
    try {
      const response: AxiosResponse<{ user: User; token: string }> =
        await api.post("/login", { email, password });

      setUser(response.data.user);
      const authData = {
        access_token: response.data.token,
        user: response.data.user,
        saveLogin,
      };
      setData(authData);
      
      if (saveLogin) {
        localStorage.setItem('@App:auth', JSON.stringify(authData));
      }
      
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setData({
        ...data,
      access_token: '',
      user: null,
      saveLogin: false,
    });
    localStorage.removeItem('@App:auth');
    api.defaults.headers["Authorization"] = "";
  };

  const refreshToken = async () => {
    // Implementation for token refresh
    // This would typically make an API call to refresh the token
  };

  const setTokenOnApiHeaders = (token: string) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  };
  return (
    <AuthContext.Provider value={{ 
      user, 
      data, 
      signIn, 
      signOut, 
      refreshToken, 
      setTokenOnApiHeaders, 
      setData 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
