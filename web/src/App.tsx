import React from 'react';

import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { ToastContainer } from 'react-toastify';

import './assets/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container">
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
    </div>
  );
}

export default App;