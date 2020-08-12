import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

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

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storageUser = localStorage.getItem('user');
        const storageToken = localStorage.getItem('token');

        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

        if (storageToken && storageUser) {
            setUser(JSON.parse(storageUser));
        }

        setLoading(false);
    }, []);

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    function signIn(email: string, password: string) {
        setLoading(true);
        const headers = { 'Authorization': process.env.BASIC_LOGIN };
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

                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setLoading(false);
            })
            .catch(err => {
                console.log('Erro', err);
                setLoading(false);
            })
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