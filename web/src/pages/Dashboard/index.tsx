import React, { useContext } from 'react';
import './styles.css';
import AuthContext from '../../contexts/auth';

function Dashboard() {
    const { signOut } = useContext(AuthContext);

    function logout() {
        signOut();
    }

    return (
        <React.Fragment>
            <h2>Dashboard</h2>
            <button onClick={logout}>Sair</button>
        </React.Fragment>
    );
}

export default Dashboard;