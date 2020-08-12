import React from 'react';
import { toast } from 'react-toastify';
import './styles.css';
import { useAuth } from '../../contexts/auth';

function Dashboard() {
    const { user } = useAuth();
    const notify = () => {
        toast.info("Info Notification !");
    };

    return (
        <React.Fragment>
            <h2>Dashboard</h2>
            <p>{user?.name}</p>
            <button onClick={notify}>Notify !</button>
        </React.Fragment>
    );
}

export default Dashboard;