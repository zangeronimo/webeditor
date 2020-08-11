import React, { useContext } from 'react';
import AuthRoutes from './auth.routes';
import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';

function Routes() {
    const { signed } = useContext(AuthContext);

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;