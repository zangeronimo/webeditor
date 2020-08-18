import React, { useEffect, useState } from 'react';
import { MdCheckCircle, MdSettings, MdEdit, MdDelete, MdHighlightOff } from 'react-icons/md';

import './styles.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/auth';

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    active: boolean;
}

const SystemUser: React.FC = () => {
    const api = useAuth();
    const [users, setUsers] = useState<[User] | any>([]);

    useEffect(() => {
        // get system user list
        const query = `{
                webUsers {
                    id
                    name
                    email
                    avatar,
                    active
                }            
            }`

        api.Query(query)
            .then(response => {
                setUsers(response.data.data.webUsers);
            })
            .catch(err => toast.warning(err.message));
    }, [api]);

    return (
        <div id="page_system_user">
            <h1>Usuários do Sistema</h1>
            <h3>Filter</h3>
            <div className="wrapper">
                <div className="table">
                    <div className="row header blue">
                        <div className="cell">ID</div>
                        <div className="cell">Name</div>
                        <div className="cell">Email</div>
                        <div className="cell">Active</div>
                        <div className="cell"><MdSettings /></div>
                    </div>

                    {users.map(
                        (user: User) => {
                            return (
                                <div key={user.id} className="row">
                                    <div className="cell" data-title="ID">{user.id}</div>
                                    <div className="cell" data-title="Name">{user.name}</div>
                                    <div className="cell" data-title="Email">{user.email}</div>
                                    <div className="cell" data-title="Active">{user.active ? <MdCheckCircle /> : <MdHighlightOff />}</div>
                                    <div className="cell" data-title="Settings"><MdEdit /><MdDelete /></div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div >

    )
}

export default SystemUser;