import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    useEffect(() => {
        const storageUser = localStorage.getItem('user');
        const storageToken = localStorage.getItem('token');

        if (storageToken && storageUser) {
            setUser(JSON.parse(storageUser));
        }
    }, []);

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    function signIn(email: string, password: string) {
        const headers = { 'Authorization': 'Basic TmVnb2Npb3NCUjo1NkRqSTRAMzhkUzIx' };
        const data = {
            query: `
            query {
              login(data: {email:"${email}", password:"${password}"}) { token }
            } 
          `
        }
        api.post("/", data, { headers })
            .then(result => {
                //Recebe o token e salva no localstorage
                const { token } = result.data.data.login;
                const user = { id: 1, name: "Luciano", email: "zangeronimo@gmail.com" };

                setUser(user)
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch(err => {
                console.log('Erro', err);
            })
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


// export const removeToken = () => {
//     // remove token
//     localStorage.removeItem('token');
// }

// export const setToken = (token: string) => {
//     // add token
//     localStorage.setItem('token', token);
// }

// export const isLogged = () => {
//     const token = localStorage.getItem('token');

//     if (token) {
//         return true;
//     }

//     return false;
// }