import React from 'react';
import './styles.css';
import { useAuth } from '../../contexts/auth';

function Dashboard() {
    const { user } = useAuth();

    return (
        <React.Fragment>
            <h1>Dashboard</h1>

            <h3>Olá {user?.name}, tudo bem?</h3>
        </React.Fragment>
    );
}

export default Dashboard;