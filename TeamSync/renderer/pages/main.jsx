import React, {useState} from 'react';
import {AppName} from "../strings/constants";
import Head from "next/head";
import ServerList from "../components/LeftPanel/ServerList";
import AddServerDialog from "../components/LeftPanel/Dialog/AddServerDialog";

const Main = () => {

    const [addServerState, setAddServerState] = useState(false)

    function addServerClick(){
        setAddServerState(true)
    }

    return (
        <div className="mainDiv">
            <Head>
                <title>{AppName}</title>
            </Head>
            <div className="rootLeftPanel">
                <ServerList addServerClick={addServerClick}/>
                <AddServerDialog active={addServerState} setActive={setAddServerState}/>
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