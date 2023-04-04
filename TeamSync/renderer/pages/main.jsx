import React from 'react';
import {AppName} from "../strings/constants";
import Head from "next/head";
import ServerList from "../components/LeftPanel/ServerList";

const Main = () => {
    return (
        <div className="mainDiv">
            <Head>
                <title>{AppName}</title>
            </Head>
            <div className="rootLeftPanel">
                <ServerList/>
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