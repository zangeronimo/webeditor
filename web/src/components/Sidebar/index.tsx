import React, { useState } from 'react';

import { useAuth } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import './styles.css';
import MenuItem from './MenuItem';

interface SidebarProps {
    width?: string;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { user, toggled } = useAuth();

    if (toggled) {
        return (<React.Fragment></React.Fragment>);
    }

    let width = props.width ? props.width : '16.5rem';

    const sidebarStyles = {
        height: '100%',
        width: `${width}`,
    };

    return (
        <nav id="sidebar_component" style={sidebarStyles}>
            <Link className="sidebar_logo" to="/" title="Dashboard">
                <p>WEBEditor</p>
            </Link>

            <header className="sidebar_profile">
                <div className="profile_avatar">
                    <img src={user?.avatar} alt={user?.name} />
                </div>
            </header>

            <MenuItem>
                <Link className="link" to="/" title="Dashboard">Dashboard</Link>
            </MenuItem>

            <MenuItem id={10} title="Institucional">
                <Link className="link" to="/institutional/new-page" title="Nova Página">Nova Página</Link>
                <Link className="link" to="/institutional/main-menu" title="Menu principal">Menu Principal</Link>
            </MenuItem>

            <MenuItem id={99} title="Sistema WEBEditor">
                <Link className="link" to="/" title="Dashboard">Alterar meu perfil</Link>
                <Link className="link" to="/" title="Dashboard">Usuários do sistema</Link>
            </MenuItem>
        </nav>
    );
}

export default Sidebar;