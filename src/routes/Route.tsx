import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { isBefore } from 'date-fns';
import { useAuth } from '../hooks/Auth';
import { toast } from 'react-toastify';

interface RouteProps {
  isPrivateAndPublic?: boolean;
  isPrivate?: boolean;
  Component: React.FC;
}

export const Route = ({
  isPrivateAndPublic = false,
  isPrivate = false,
  Component,
}: RouteProps) => {
  const { data, signOut, refreshToken, setTokenOnApiHeaders } = useAuth();
  const [renderRoute, setRenderRoute] = useState(false);
  const location = useLocation();

  const verifyAccessToken = async () => {
    setRenderRoute(false);
    if (data.access_token) {
      setTokenOnApiHeaders(data.access_token);

      const decodedToken: any = decode(data.access_token);

      const currentDate = new Date();
      let expirationDate = new Date(decodedToken.exp * 1000);

      if (isBefore(expirationDate, currentDate)) {
        if (!data.saveLogin) {
          signOut();
          window.location.reload();
          return;
        }

        await refreshToken();
      }

      setRenderRoute(true);
    } else {
      setRenderRoute(true);
    }
  };

  useEffect(() => {
    verifyAccessToken();
  }, [location.pathname]);

  if (
    location.pathname !== '/home' &&
    location.pathname !== '/' &&
    data?.user?.role?.name === 'Coleta'
  ) {
    toast.error('Usuário não autorizado!');
    return <Navigate to="/home" />;
  }

  if (isPrivateAndPublic) {
    return renderRoute ? <Component /> : null;
  }

  if (isPrivate === !!data.access_token) {
    return renderRoute ? <Component /> : null;
  }

  return <Navigate to={isPrivate ? '/' : '/home'} state={{ from: location }} />;
};
