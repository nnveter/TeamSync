import React, {useRef, useState} from 'react';
import {AppName, SockJsUrl, URL} from "@/strings/constants";
import Head from "next/head";
import ServerList from "../components/LeftPanel/ServerList";
import ChannelList from "../components/LeftDopPanel/ChannelList";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import MessageList from "../components/CentralPanel/MessageList";
import axios from "axios";
import {getJwt} from "@/other/getjwt";
import SendMessage from "../components/CentralPanel/SendMessage";
import Settings from "../components/main/Settings";
import ToolBar from "@/components/Other/ToolBar";

const Main = () => {
    const [listServer, setListServer] = useState([])
    const [openServer, setOpenServer] = useState([])
    const [refreshListServer, setRefreshListServer] = useState(false)
    const [openChannel, setOpenChannel] = useState([])
    const [stompClient, setStompClient] = useState({})
    const [messageList, setMessageList] = useState([])
    const thisMessageList = useRef([])

    const [isShowSettings, setIsShowSettings] = useState(false)
    const [settingNames, setSettingNames] = useState([])
    const [settingComponents, setSettingComponents] = useState([])

    const [showContextMenuChannelList, setShowContextMenuChannelList] = useState(false);

    function getMessage(id){
        axios({
            url: URL + `messages/channel/${id}`,
            method: "get",
            headers: {'Authorization': "Bearer " + getJwt().access}
        })
            .then(r => {
                setMessageList(r.data.content)
                thisMessageList.current = r.data.content
            })
            .catch(() => {

            })
    }

    function connectMessage(id) {
        getMessage(id)
            let tempStompClient= stompClient
            if (!Object.keys(tempStompClient).length){
                const socket = new SockJS(SockJsUrl);
                tempStompClient = Stomp.over(socket)
            }

            if (tempStompClient.connected){
                tempStompClient.disconnect()
                const socket = new SockJS(SockJsUrl);
                tempStompClient= Stomp.over(socket)
            }
            tempStompClient.connect({}, () => {
                tempStompClient.subscribe('/topic/channel-' + id, (message) => {
                    const msg = JSON.parse(message.body);
                    let tempMessage = Object.assign([], thisMessageList.current)
                    tempMessage.unshift(msg)
                    thisMessageList.current = tempMessage
                    setMessageList(tempMessage)
                    console.log(msg)
                });
            });
            setStompClient(tempStompClient)
    }

    return (
        <>
            <ToolBar/>
            <div className="mainDiv" onClick={() => setShowContextMenuChannelList(false)}>
                <Head>
                    <title>{AppName}</title>
                </Head>
                <Settings isShow={isShowSettings} setIsShow={setIsShowSettings} names={settingNames}>
                    {settingComponents}
                </Settings>
                <div className="rootLeftPanel">
                    <ServerList openServer={openServer} setOpenServer={setOpenServer} listServer={listServer} setListServer={setListServer}/>
                </div>
                <div className="rootLeftDopPanel">
                    <div className="serverTitleContainer">
                        <text>{(listServer.length === 0 || !openServer[0]) ? "" : listServer.filter(v => v.id === openServer[0])[0].title}</text>
                    </div>
                    <ChannelList serverId={openServer}
                                 refreshListServer={refreshListServer} setrefreshListServer={setRefreshListServer}
                                 openChannel={openChannel} setOpenChannel={setOpenChannel} connectMessage={connectMessage}
                                 setIsShowSettings={setIsShowSettings} showContextMenuChannelList={showContextMenuChannelList}
                                 setShowContextMenuChannelList={setShowContextMenuChannelList}/>
                </div>
                <div className="rootCentralPanel">
                    { openServer[0] !== undefined &&
                        <SendMessage openChannel={openChannel}/>
                    }
                    { openServer[0] !== undefined &&
                        <MessageList openChannel={openChannel} messageList={messageList}/>
                    }
                </div>
                 {/*<div className="rootRightPanel">*/}

                 {/*</div>*/}

            </div>
        </>
    );
};

export default Main;