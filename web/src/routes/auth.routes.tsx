import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';

function AuthRoutes() {
    return (
        <Route path="/" exact component={Login} />
    );
}

export default AuthRoutes;