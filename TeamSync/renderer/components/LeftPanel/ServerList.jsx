import React, {useEffect, useState} from 'react';
import Server from "./Server";
import SeparatorServer from "./SeparatorServer";
import AddServer from "./AddServer";
import LsServer from "./LsServer";
import axios from "axios";
import {URL} from "../../strings/constants";
import {getJwt, setJwt} from "../../other/getjwt";
import AddServerDialog from "./Dialog/AddServerDialog";

const ServerList = (props) => {

    function getServer(){
        axios({
            url: URL + "spaces/my",
            method: "get",
            headers: {'Authorization': "Bearer " + getJwt().access}
        })
            .then(r => {
                setListServer(r.data)
            })
            .catch(() => {
                console.log("Не удаёться получить сервера пользователя")
            })
    }

    useEffect(getServer, [])


    const [listServer, setListServer] = useState([])

    const [addServerState, setAddServerState] = useState(false)

    return (
        <div>
            <div className="serverList">
                <LsServer/>
                <SeparatorServer/>
                { listServer.map((e) =>
                    <Server info={e} key={e.id} onClick={() => props.setOpenServer([e.id])} />) }
                <AddServer onClick={() => setAddServerState(true)}/>
            </div>
            <AddServerDialog active={addServerState} setActive={setAddServerState} successful={getServer}/>
        </div>
    );
};

export default ServerList;