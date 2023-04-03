import React, {useEffect, useState} from 'react';
import {AppName} from "../strings/constants";
import Head from "next/head";
import {getJwt, removeJwt} from "../other/getjwt";
import Alert from "../components/Alert";

const Main = () => {

    useEffect(() => {
        removeJwt()
    }, [])

    return (
        <div className="mainDiv">
            <Head>
                <title>{AppName}</title>
            </Head>
            <div className="rootLeftPanel">

            </div>
            <div className="rootLeftDopPanel">

            </div>
            <div className="rootCentralPanel">
            </div>
            <div className="rootRightPanel">

            </div>
        </div>
    );
};

export default Main;