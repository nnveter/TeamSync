import React, {useState} from 'react';
import Link from 'next/link';
import axios from "axios";
import {AppName, URL} from "@/strings/constants";
import {setJwt} from "@/other/getjwt";
import Head from "next/head";
import {router} from "next/client";
import Alert from "../../components/Alert";

const Login = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [state, setState] = useState(false)
    const OnClick = () => {
        axios({
            url: URL + "auth/login",
            method: "post",
            data: {email: email, password: password}
        })
            .then(r => {
                setJwt(r.data.accessToken, r.data.refreshToken)
                router.push("/main")
            })
            .catch(() => {
                setState(true)
            })
    }
    return (
        <>
        {state && <Alert message="Неверный логин или пароль" sost={state} func={setState}></Alert>}
            <div className="bgLog">
                <Head>
                    <title>{AppName}</title>
                </Head>
                <div className="container">
                    <span className="title">Login</span>
                    <div className="inputBox">
                        <input type="text" required="required" value={email} onChange={e => setEmail(e.target.value)}/>
                        <span>Email</span>
                    </div>
                    <div className="inputBox">
                        <input type="password" required="required" value={password} onChange={e => setPassword(e.target.value)}/>
                        <span>Пароль</span>
                    </div>
                    <div>
                        <button className="button" onClick={OnClick}>Next</button>
                    </div>
                    <div className="box">
                        <span className="text">Ещё нет аккаунта?</span>
                        <Link href="registration">
                            <text className="hyperLink">зарегистрироваться</text >
                        </Link>
                    </div>
                </div>
                <ul className="glass">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            </>
    );
};

export default Login;