import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

import './styles.css';
import MYProfile from '../pages/System/MyProfile';
import SystemUser from '../pages/System/SystemUser';

function AppRoutes() {
    return (
        <section className="content_block">
            <nav className="sidebar">
                <Sidebar />
            </nav>
            <Navbar />
            <article className="content">
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/system/my-profile" component={MYProfile} />
                    <Route path="/system/users" component={SystemUser} />
                    <Route path='*' component={Dashboard} />
                </Switch>
            </article>
            <Footer />
        </section>
    );
}

export default AppRoutes;