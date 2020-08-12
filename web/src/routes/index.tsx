import React from 'react';
import AuthRoutes from './auth.routes';
import { useAuth } from '../contexts/auth';
import AppRoutes from './app.routes';
import ClipLoader from "react-spinners/ClipLoader";

function Routes() {
    const { signed, loading } = useAuth();

    const Loading =
        <ClipLoader
            size={64}
            color={"#123abc"}
            loading={loading}
        />;

    if (signed) {
        return (
            <React.Fragment>
                <AppRoutes />
                {Loading}
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <AuthRoutes />
                {Loading}
            </React.Fragment>
        );
    }
}

export default Routes;