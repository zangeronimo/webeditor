import React from 'react';

import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

import './assets/styles/global.css'
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;