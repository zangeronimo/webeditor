import React from 'react';

import { useAuth } from '../../contexts/auth';
import { Link } from 'react-router-dom';

import './styles.css';
import MenuItem from './MenuItem';

interface SidebarProps {
    width?: string;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { user, toggled, checkWindowWidthToToggle } = useAuth();

    if (toggled) {
        return (<React.Fragment></React.Fragment>);
    }

    let width = props.width ? props.width : '16.5rem';

    const sidebarStyles = {
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
                <Link className="link" to="/" title="Dashboard" onClick={checkWindowWidthToToggle}>Dashboard</Link>
            </MenuItem>

            <MenuItem id={10} title="Institucional">
                <Link className="link" to="/institutional/new-page" title="Nova Página" onClick={checkWindowWidthToToggle}>Nova Página</Link>
                <Link className="link" to="/institutional/main-menu" title="Menu principal" onClick={checkWindowWidthToToggle}>Menu Principal</Link>
            </MenuItem>

            <MenuItem id={99} title="Sistema WEBEditor">
                <Link className="link" to="/system/my-profile" title="Dashboard" onClick={checkWindowWidthToToggle}>Alterar meu perfil</Link>
                <Link className="link" to="/system/users" title="Dashboard" onClick={checkWindowWidthToToggle}>Usuários do sistema</Link>
            </MenuItem>
        </nav>
    );
}

export default Sidebar;