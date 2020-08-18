import React, { createContext, useState, useEffect, useContext } from 'react';
import jwt from 'jsonwebtoken';

import api from '../services/api';
import PacmanLoader from "react-spinners/PacmanLoader";
import { AxiosResponse, AxiosRequestConfig } from 'axios';

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
    Query(data: string, config?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any>>;
    setToggled(): void;
    toggled: boolean;
    checkWindowWidthToToggle(): void;
    setUser(user: User): void;
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
        api.defaults.withCredentials = true
        refreshToken()
            .then(_ => {
                setLoading(false);
            })
            .catch(_ => {
                console.log('Sessão expirada');
                signOut();
                setLoading(false);
            })

        checkWindowWidthToToggle();
    }, []);

    async function Query(data: string, config?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any>> {
        // if token is Invalid, refresh token
        if (isInvalidToken()) {
            try {
                await refreshToken()
            } catch (e) {
                signOut();
                return Promise.reject(new Error('Sessão expirada'));
            }
        }
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        return await api.post('/', { query: data }, { ...config, headers });
    }

    function isInvalidToken() {
        const token = localStorage.getItem('token');

        return !token || jwtIsExpired(token);
    }

    function jwtIsExpired(token: string) {
        const jwtData: JWTData | any = jwt.decode(token);

        if (Date.now() >= jwtData.exp * 1000 - 5000) {
            return true;
        }

        return false;
    }

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    async function signIn(email: string, password: string) {
        const headers = {
            'Authorization': process.env.BASIC_LOGIN,
            'withCredentials': true,
        };
        const data = {
            query: `
            {
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

                    setUser(user);

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                } catch (err) {
                    signOut();
                }
            })
            .catch(err => {
                signOut();
            })
    }

    async function refreshToken() {
        const headers = {
            'Authorization': process.env.BASIC_LOGIN,
            'withCredentials': true,
        };
        const data = {
            query: `
            {
                refreshToken { token }
            }
          `
        }
        return await api.post("/", data, { headers })
            .then(result => {
                //Get the token and save him in localstorage
                try {
                    const { token } = result.data.data.refreshToken;

                    // Open and get data
                    const jwtData: JWTData | any = jwt.decode(token);

                    // Get user data
                    const { id, name, email, avatar } = jwtData
                    const user = { id, name, email, avatar };

                    setUser(user);

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    return Promise.resolve(null);
                } catch (err) {
                    return Promise.reject(null);
                }
            })
            .catch(err => {
                return Promise.reject(null);
            })
    }

    if (loading) {
        return (
            <div className="loader">
                <PacmanLoader
                    size={32}
                    color={"#bbb"}
                    loading={loading}
                />
            </div>
        );
    }

    function checkWindowWidthToToggle() {
        // check the windows size
        const windowWidth = window.innerWidth;

        if (windowWidth < 640) {
            setToggledFlag(true);
        }
    }

    function setToggled() {
        setToggledFlag(!toggled);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, setToggled, toggled, checkWindowWidthToToggle, setUser, Query }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}