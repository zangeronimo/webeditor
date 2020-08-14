import React from 'react';
import AuthRoutes from './auth.routes';
import { useAuth } from '../contexts/auth';
import AppRoutes from './app.routes';

function Routes() {
    const { signed } = useAuth();

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;