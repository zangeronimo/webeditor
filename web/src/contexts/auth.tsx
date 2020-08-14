import React, { createContext, useState, useEffect, useContext } from 'react';
import jwt from 'jsonwebtoken';

import api from '../services/api';
import { toast } from 'react-toastify';
import PacmanLoader from "react-spinners/PacmanLoader";

import 'react-toastify/dist/ReactToastify.css';

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(email: string, password: string): void;
    signOut(): void;
    setToggled(): void;
    toggled: boolean;
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
    const [toggled, setToggledFlag] = useState(false);

    useEffect(() => {
        const storageUser = localStorage.getItem('user');
        const storageToken = localStorage.getItem('token');

        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

        if (storageToken && storageUser) {
            // TODO - go to backend and validade jwt before setUser.

            setUser(JSON.parse(storageUser));
        }

        // check the windows size
        const windowWidth = window.innerWidth;

        if (windowWidth < 640) {
            setToggledFlag(true);
        }

        setLoading(false);
    }, []);

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    async function signIn(email: string, password: string) {
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
                    const { id, name, email, avatar } = jwtData
                    const user = { id, name, email, avatar };

                    setUser(user)

                    api.defaults.headers['Authorization'] = `Bearer ${token}`;

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                } catch (err) {
                    toast.warning("Login inválido!");
                }
            })
            .catch(err => {
                toast.warning("Login inválido!");
            })
    }

    if (loading) {
        return (
            <PacmanLoader
                size={32}
                color={"#bbb"}
                loading={loading}
            />
        );
    }

    function setToggled() {
        setToggledFlag(!toggled);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, setToggled, toggled }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}