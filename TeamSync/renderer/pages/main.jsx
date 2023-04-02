import React, {useEffect} from 'react';
import {AppName} from "../strings/constants";
import Head from "next/head";
import {getJwt, removeJwt} from "../other/getjwt";

const Main = () => {
    useEffect(() => {
        removeJwt()
    }, [])
    return (
        <div>
            <Head>
                <title>{AppName}</title>
            </Head>
        </div>
    );
};

export default Main;