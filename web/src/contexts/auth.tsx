import React, { createContext, useState, useEffect, useContext } from 'react';
import jwt from 'jsonwebtoken';

import api from '../services/api';
import { toast } from 'react-toastify';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(email: string, password: string): void;
    signOut(): void;
    loading: boolean;
}

interface JWTData {
    id: number,
    name: string,
    email: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storageUser = localStorage.getItem('user');
        const storageToken = localStorage.getItem('token');

        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

        if (storageToken && storageUser) {
            // TODO - go to backend and validade jwt before setUser.

            setUser(JSON.parse(storageUser));
        }

        setLoading(false);
    }, []);

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    async function signIn(email: string, password: string) {
        setLoading(true);
        const headers = { 'Authorization': process.env.BASIC_LOGIN };
        const data = {
            query: `
            query {
              login(data: {email:"${email}", password:"${password}"}) { token }
            } 
          `
        }
        await api.post("/", data, { headers })
            .then(result => {
                //Get the token and save him in localstorage
                try {
                    const { token } = result.data.data.login;
                    // Open and get data
                    const jwtData: JWTData | any = jwt.decode(token);

                    // Get user data
                    const { id, name, email } = jwtData
                    const user = { id, name, email };

                    setUser(user)

                    api.defaults.headers['Authorization'] = `Bearer ${token}`;

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                } catch (err) {
                    setLoading(false);
                    toast.warning("Login inválido!");
                }
            })
            .catch(err => {
                setLoading(false);
                toast.warning("Login inválido!");
            })

        setLoading(false);
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}