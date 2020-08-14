import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

import './styles.css';
import MYProfile from '../pages/MyProfile';

function AppRoutes() {
    return (
        <section id="container">
            <section className="content_block">
                <Navbar />
                <nav className="sidebar">
                    <Sidebar />
                </nav>
                <article className="content">
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/my-profile" component={MYProfile} />
                        <Route path='*' component={Dashboard} />
                    </Switch>
                </article>
                <Footer />
            </section>
        </section>
    );
}

export default AppRoutes;