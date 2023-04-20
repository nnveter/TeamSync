import React, {useEffect, useState} from 'react';
import {AppName} from "../strings/constants";
import Head from "next/head";
import ServerList from "../components/LeftPanel/ServerList";
import ChannelList from "../components/LeftDopPanel/ChannelList";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const Main = () => {

    const [listServer, setListServer] = useState([])
    const [openServer, setOpenServer] = useState([])
    const [refreshListServer, setRefreshListServer] = useState(false)
    const [openChannel, setOpenChannel] = useState([])
    const [stompClient, setStompClient] = useState({})

    function connectMessage(id) {
            let tempStompClient= stompClient
            if (!Object.keys(tempStompClient).length){
                const socket = new SockJS('http://localhost:8080/ws');
                tempStompClient = Stomp.over(socket)
            }

            if (tempStompClient.connected){
                tempStompClient.disconnect()
                const socket = new SockJS('http://localhost:8080/ws');
                tempStompClient= Stomp.over(socket)
            }
            tempStompClient.connect({}, () => {
                tempStompClient.subscribe('/topic/channel-' + id, (message) => {
                    const msg = JSON.parse(message.body);
                    console.log(msg);
                });
            });
            setStompClient(tempStompClient)
    }

    return (
        <div className="mainDiv">
            <Head>
                <title>{AppName}</title>
            </Head>
            <div className="rootLeftPanel">
                <ServerList setOpenServer={setOpenServer} listServer={listServer} setListServer={setListServer}/>
            </div>
            <div className="rootLeftDopPanel">
                <div className="serverTitleContainer">
                    <text>{(listServer.length === 0 || !openServer[0]) ? "" : listServer.filter(v => v.id === openServer[0])[0].title}</text>
                </div>
                <ChannelList serverId={openServer}
                             refreshListServer={refreshListServer} setrefreshListServer={setRefreshListServer}
                             openChannel={openChannel} setOpenChannel={setOpenChannel} connectMessage={connectMessage}/>
            </div>
            <div className="rootCentralPanel">

            </div>
            <div className="rootRightPanel">

            </div>
        </div>
    );
};

export default Main;