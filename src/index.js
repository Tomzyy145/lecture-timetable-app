import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { apiSlice } from './context api/myContext';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import {ContextProvider} from './context api/myContext'
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Router>
        <ApiProvider api={apiSlice}>
          <ContextProvider>
            <App />
          </ContextProvider>
       </ApiProvider>
    </Router>
  </React.StrictMode>
);

