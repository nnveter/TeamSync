import React, {useState} from 'react';
import {AppName} from "../strings/constants";
import Head from "next/head";
import ServerList from "../components/LeftPanel/ServerList";
import ChannelList from "../components/LeftDopPanel/ChannelList";

const Main = () => {

    const [openServer, setOpenServer] = useState([-1])
    const [refreshListServer, setRefreshListServer] = useState(false)

    return (
        <div className="mainDiv">
            <Head>
                <title>{AppName}</title>
            </Head>
            <div className="rootLeftPanel">
                <ServerList setOpenServer={setOpenServer}/>
            </div>
            <div className="rootLeftDopPanel">
                <div className="serverTitleContainer">
                    <text>Сервер</text>
                </div>
                <ChannelList serverId={openServer} refreshListServer={refreshListServer} setrefreshListServer={setRefreshListServer}/>
            </div>
            <div className="rootCentralPanel">

            </div>
            <div className="rootRightPanel">

            </div>
        </div>
    );
};

export default Main;