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
    const saveLogin =
      !!localStorage.getItem('@Selad-adm:access_token') || false;

    let access_token;
    let refresh_token;
    let user;

    if (saveLogin) {
      access_token = localStorage.getItem('@Selad-adm:access_token') || '';
      refresh_token = localStorage.getItem('@Selad-adm:refresh_token') || '';
      user = localStorage.getItem('@Selad-adm:user') || '{}';
    } else {
      access_token = sessionStorage.getItem('@Selad-adm:access_token') || '';
      refresh_token = sessionStorage.getItem('@Selad-adm:refresh_token') || '';
      user = sessionStorage.getItem('@Selad-adm:user') || '{}';
    }

    if (access_token) {
      return {
        access_token,
        refresh_token,
        user: JSON.parse(user),
        saveLogin,
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password, saveLogin }: SignInCredentials) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { user } = response.data;
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      if (saveLogin) {
        setData({ access_token, refresh_token, user, saveLogin });
      } else {
        setData({ access_token, user, saveLogin });
      }

      setTokenOnApiHeaders(access_token);
    },
    [],
  );

  const updateLocalStorage = () => {
    if (JSON.stringify(data) === '{}') {
      localStorage.removeItem('@Selad-adm:access_token');
      localStorage.removeItem('@Selad-adm:refresh_token');
      localStorage.removeItem('@Selad-adm:user');
      localStorage.removeItem('@Selad-adm:saveLogin');
      sessionStorage.removeItem('@Selad-adm:access_token');
      sessionStorage.removeItem('@Selad-adm:refresh_token');
      sessionStorage.removeItem('@Selad-adm:user');
      return;
    }

    if (data.saveLogin) {
      localStorage.setItem('@Selad-adm:access_token', data.access_token || '');
      localStorage.setItem(
        '@Selad-adm:refresh_token',
        data.refresh_token || '',
      );
      localStorage.setItem('@Selad-adm:user', JSON.stringify(data.user) || '');
      localStorage.setItem('@Selad-adm:saveLogin', data.saveLogin.toString());
    } else {
      sessionStorage.setItem(
        '@Selad-adm:access_token',
        data.access_token || '',
      );
      sessionStorage.setItem(
        '@Selad-adm:user',
        JSON.stringify(data.user) || '',
      );
      localStorage.setItem('@Selad-adm:saveLogin', 'false');
    }
  };

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
          .then((res: any) => {
            setData({
              ...data,
              refresh_token: res.data.refresh_token,
              access_token: res.data.access_token,
            });

            setTokenOnApiHeaders(res.data.access_token);
            window.location.reload();
            return res;
          })
          .catch((err: any) => {
            signOut();
            window.location.reload();
            return err;
          });
      } catch (err) {
        return err;
      }
    });
  };

  useEffect(() => {
    updateLocalStorage();
  }, [data]);

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
