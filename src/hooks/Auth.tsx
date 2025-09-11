import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

import api from '../services/api';
import { AxiosResponse } from 'axios';

interface User {
  id: string;
  email: string;
  avatar_url: string;
  role: {
    id: string;
    name: string;
  }
}

interface AuthState {
  access_token: string;
  refresh_token?: string;
  user: User;
  saveLogin?: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
  saveLogin: boolean;
}

interface AuthContextData {
  data: AuthState;
  setData: Dispatch<SetStateAction<AuthState>>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  refreshToken(): void;
  setTokenOnApiHeaders(data: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const setTokenOnApiHeaders = (token: string) => {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  };

  const [data, setData] = useState<AuthState>(() => {
    const savedToken = localStorage.getItem('@Selad-adm:access_token');
    const savedUser = localStorage.getItem('@Selad-adm:user');
    const savedRefreshToken = localStorage.getItem('@Selad-adm:refresh_token');

    if (savedToken && savedUser && savedRefreshToken) {
      setTokenOnApiHeaders(savedToken);
      return { access_token: savedToken, user: JSON.parse(savedUser), refresh_token: savedRefreshToken, saveLogin: true };
    }

    const sessionToken = sessionStorage.getItem('@Selad-adm:access_token');
    const sessionUser = sessionStorage.getItem('@Selad-adm:user');

    if (sessionToken && sessionUser) {
      setTokenOnApiHeaders(sessionToken);
      return { access_token: sessionToken, user: JSON.parse(sessionUser), saveLogin: false };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password, saveLogin }: SignInCredentials) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { user, access_token, refresh_token } = response.data;

      if (saveLogin) {
        localStorage.setItem('@Selad-adm:access_token', access_token);
        localStorage.setItem('@Selad-adm:user', JSON.stringify(user));
        localStorage.setItem('@Selad-adm:refresh_token', refresh_token);
      } else {
        sessionStorage.setItem('@Selad-adm:access_token', access_token);
        sessionStorage.setItem('@Selad-adm:user', JSON.stringify(user));
      }

      setData({ access_token, refresh_token, user, saveLogin });
      setTokenOnApiHeaders(access_token);
    },
    [],
  );




  const signOut = useCallback(() => {
    setData({} as AuthState);
  }, []);

  const refreshToken = async () => {
    return new Promise((resolve, reject) => {
      try {
        const refresh_token = data.refresh_token;
        api
          .put('/sessions/refresh-token', {
            refresh_token,
          })
          .then((res: AxiosResponse<AuthResponse>) => {
            setData({
              ...data,
              refresh_token: res.data.refresh_token,
              access_token: res.data.access_token,
            });

            setTokenOnApiHeaders(res.data.access_token);
            return res;
          })
          .catch((err: AxiosError) => {
            signOut();
            return err;
          });
      } catch (err) {
        return err;
      }
    });
  };



  return (
    <AuthContext.Provider
      value={{
        data,
        setData,
        signIn,
        signOut,
        refreshToken,
        setTokenOnApiHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };


interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}


