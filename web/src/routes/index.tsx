import React from 'react';
import AuthRoutes from './auth.routes';
import { useAuth } from '../contexts/auth';
import AppRoutes from './app.routes';
import Loading from '../pages/Loading';

function Routes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;