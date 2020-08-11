import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

function AppRoutes() {
    return (
        <Route path="/" exact component={Dashboard} />
    );
}

export default AppRoutes;