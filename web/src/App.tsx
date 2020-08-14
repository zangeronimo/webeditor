import React from 'react';

import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

import './assets/styles/global.css'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;