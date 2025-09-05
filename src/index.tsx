import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import { Routes } from './routes';
import { GlobalStyle } from './styles/global';

import AppProvider from './hooks/index';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
    <ToastContainer autoClose={3000} />
  </React.StrictMode>,
  document.getElementById('root'),
);
