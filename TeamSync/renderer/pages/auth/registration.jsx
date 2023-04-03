import React, {useState} from 'react';
import Link from 'next/link';
import axios from "axios";
import {AppName, URL} from "../../strings/constants";
import {setJwt} from "../../other/getjwt";
import {router} from "next/client";
import Head from "next/head";
import Alert from "../../components/Alert";

const Registration = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [FirstName, setFirstName] = useState('');
    let [LastName, setLastNAme] = useState('');

    let [state, setState] = useState(false)
    const OnClick = () => {
        axios({
            url: URL + "auth/signup",
            method: "post",
            data: {email: email.toString(), password: password.toString(), firstName: FirstName.toString(), lastName: LastName.toString()}
        })
            .then(r => {
                setJwt(r.data.accessToken, r.data.refreshToken)
                router.push("/main")
            })
            .catch(e => {
                setState(true)
            })
    }

    return (
        <>
            {state && <Alert message="неверный логин или пароль" sost={state} func={setState}></Alert>}
            <div className="bgReg">
                <Head>
                    <title>{AppName}</title>
                </Head>
                <div className="container">
                    <span className="title">Create new account</span>
                    <div className="inputBox">
                        <input type="text" required="required" value={FirstName} onChange={e => setFirstName(e.target.value)}/>
                        <span>First name</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" required="required" value={LastName} onChange={e => setLastNAme(e.target.value)}/>
                        <span>Last name</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" required="required" value={email} onChange={e => setEmail(e.target.value)}/>
                        <span>Email</span>
                    </div>
                    <div className="inputBox">
                        <input type="password" required="required" value={password} onChange={e => setPassword(e.target.value)}/>
                        <span>Password</span>
                    </div>
                    <div>
                        <button className="button" onClick={OnClick}>Next</button>
                    </div>
                    <div className="box">
                        <span className="text">Do you already have an account?</span>
                        <Link href="login">
                            <a className="hyperLink">sing in</a>
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

export default Registration;