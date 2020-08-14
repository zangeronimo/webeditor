import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { MdVisibility, MdVisibilityOff, MdCheckCircle, MdCancel } from 'react-icons/md';

import './styles.css';

function Login() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [iconEye, setIconEye] = useState(<MdVisibility />);
    const [iconCheckEmail, setIconCheckEmail] = useState(<MdCheckCircle />);
    const [formOk, setFormOk] = useState(true);

    const login = () => {
        signIn(email, password)

    }

    const toggleVisibility = () => {
        if (passwordType === "text") {
            setPasswordType("password");
            setIconEye(<MdVisibility />);
        } else {
            setPasswordType("text");
            setIconEye(<MdVisibilityOff />);
        }
    }

    const changeEmail = (e: any) => {
        let email = e.target.value;
        validaEmail(email);
        setEmail(email);
    }

    const validaEmail = (email: string) => {
        if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email) === false) {
            setIconCheckEmail(<MdCancel className="iconCancel" />);
            setFormOk(true);
        } else {
            setIconCheckEmail(<MdCheckCircle />);
            setFormOk(false);
        }
    }

    return (
        <section id="page-login" className="background">
            <header className="navbar">
                <div className="logo">WEBEditor</div>
            </header>
            <section className="content">
                <article className="field">
                    Email
                    <div className="input">
                        <input type="text"
                            autoComplete="0"
                            value={email}
                            autoFocus
                            onChange={changeEmail} />
                        <div className="icon">{iconCheckEmail}</div>
                    </div>
                </article>
                <article className="field">
                    Senha
                    <div className="input">
                        <input type={passwordType}
                            id="password" value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <div className="icon" onClick={() => toggleVisibility()}>{iconEye}</div>
                    </div>
                </article>
                {/* <div>
                    <a href="#ok">Esqueci minha senha</a>
                </div> */}
                <div className="btn">
                    <button onClick={login} disabled={formOk}>Entrar</button>
                </div>
            </section>
            <footer className="footer">Versão 0.0.1</footer>
        </section>
    )


}

export default Login;