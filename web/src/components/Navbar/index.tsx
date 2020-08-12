import React from 'react';
import './styles.css';
import { useAuth } from '../../contexts/auth';
import { MdExitToApp } from 'react-icons/md';

function Navbar() {
    const { signOut } = useAuth();

    function logout() {
        signOut();
    }

    return (
        <div id="navbar">
            <div className="logo">WEBEditor</div>
            <div className="tools">
                <MdExitToApp onClick={logout} />
            </div>
        </div>
    );
}

export default Navbar;