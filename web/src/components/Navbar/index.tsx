import React from 'react';
import './styles.css';
import { useAuth } from '../../contexts/auth';
import { MdExitToApp, MdMenu } from 'react-icons/md';

function Navbar() {
    const { signOut, setToggled } = useAuth();

    function logout() {
        signOut();
    }

    return (
        <div id="navbar">
            <div className="icon">
                <MdMenu onClick={setToggled} />
            </div>
            <div className="icon">
                <MdExitToApp onClick={logout} />
            </div>
        </div>
    );
}

export default Navbar;