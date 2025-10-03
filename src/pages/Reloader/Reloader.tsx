import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { } from './_Reloader';

export const Reloader: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    history.goBack();
  }, []);

  return <></>;
};
