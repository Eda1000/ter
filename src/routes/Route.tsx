import React, { useState, useEffect } from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { isBefore } from 'date-fns';
import { useAuth } from '../hooks/Auth';
import { toast } from 'react-toastify';

interface RouteProps {
  isPrivateAndPublic?: boolean;
  isPrivate?: boolean;
  Component: React.FC;
  path: string;
  exact?: boolean;
}

export const Route = ({
  isPrivateAndPublic = false,
  isPrivate = false,
  Component,
  path,
  exact,
  ...rest
}: RouteProps) => {
  const { data, signOut, refreshToken, setTokenOnApiHeaders } = useAuth();
  const [renderRoute, setRenderRoute] = useState(false);

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
  }, [path]);

  return (
    <ReactDOMRoute
      {...rest}
      exact
      render={({ location }) => {
        if(path !== '/home'
        && path !== '/'
        && data?.user?.role?.name === 'Coleta'){
          toast.error('Usuário não autorizado!')

          return <Redirect to="/home"/>
        }

        if (isPrivateAndPublic) {
          return renderRoute && <Component />;
        }

        if (
          isPrivate ===
          (data.access_token !== undefined && data.access_token !== '')
        ) {
          return renderRoute && <Component />;
        }

        return (
          renderRoute && (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/home',
              }}
            />
          )
        );
      }}
    />
  );
};
