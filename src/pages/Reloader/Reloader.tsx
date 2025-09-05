import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// import { } from './_Reloader';

export const Reloader: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.goBack();
  }, []);

  return <></>;
};
