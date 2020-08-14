import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';

function AuthRoutes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path='*' component={Login} />
        </Switch>
    );
}

export default AuthRoutes;