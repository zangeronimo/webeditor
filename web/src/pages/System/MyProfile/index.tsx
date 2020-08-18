import React, { useState, FormEvent } from 'react';
import Input from '../../../components/Input';

import './styles.css';
import { useAuth } from '../../../contexts/auth';
import { toast } from 'react-toastify';

function MyProfile() {
    const { user, setUser, Query } = useAuth();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(user?.avatar);

    function handleSave(e: FormEvent) {
        e.preventDefault();

        const newPassword = password && `password: "${password}",`;

        const data = `{
            name: "${name}",
            email:"${email}",
            ${newPassword}
            avatar: "${avatar}"
        }`;

        const query = `
            mutation {
              updateWebUser(
                  filter: { id: 1 }
                  data: ${data}
              ) { id, name, email, avatar }
            } 
          `

        Query(query).then((result) => {
            const resultUser = result.data.data.updateWebUser;
            setUser(resultUser);
            toast.success("Dados salvo com sucesso");
        }).catch(e => {
            toast.warning("Algo deu errado", e.message);
        })
    }

    return (
        <div id="page-my-profile-form">
            <h1>Meu Perfil</h1>
            <main>
                <form onSubmit={handleSave}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            label="Name"
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={user?.email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <Input
                            label="Password"
                            name="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <Input
                            label="Avatar"
                            name="avatar"
                            value={user?.avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                    </fieldset>

                    <footer>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default MyProfile;