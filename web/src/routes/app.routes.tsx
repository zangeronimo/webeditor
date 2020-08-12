import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './styles.css';

function AppRoutes() {
    return (
        <div id="container">
            <Navbar />
            <div className="content">
                <Route path="/" exact component={Dashboard} />
            </div>
            <Footer />
        </div>
    );
}

export default AppRoutes;