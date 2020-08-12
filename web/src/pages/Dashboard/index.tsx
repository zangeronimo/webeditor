import React from 'react';
import './styles.css';
import { useAuth } from '../../contexts/auth';

function Dashboard() {
    const { user, signOut } = useAuth();

    function logout() {
        signOut();
    }

    return (
        <React.Fragment>
            <h2>Dashboard</h2>
            <p>{user?.name}</p>
            <button onClick={logout}>Sair</button>
        </React.Fragment>
    );
}

export default Dashboard;