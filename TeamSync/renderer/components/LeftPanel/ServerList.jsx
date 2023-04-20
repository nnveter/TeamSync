import React, {useEffect, useState} from 'react';
import Server from "./Server";
import SeparatorServer from "./SeparatorServer";
import AddServer from "./AddServer";
import LsServer from "./LsServer";
import axios from "axios";
import {URL} from "../../strings/constants";
import {getJwt} from "../../other/getjwt";
import AddServerDialog from "./Dialog/AddServerDialog";
import Dialog from "./Dialog/Dialog";
import ActivateCodeDialog from "./Dialog/ActivateCodeDialog";
import ActiveCode from "./ActiveCode";

const ServerList = (props) => {

    const [dialogState, setDialogState] = useState(false)
    const [dialogState2, setDialogState2] = useState(false)

    function getServer(id){
        axios({
            url: URL + "spaces/my",
            method: "get",
            headers: {'Authorization': "Bearer " + getJwt().access}
        })
            .then(r => {
                props.setListServer(r.data)
                setDialogState(false)
                setDialogState2(false)
                props.setOpenServer([id])
            })
            .catch(() => {
                console.log("Не удаёться получить сервера пользователя")
            })
    }

    useEffect(getServer, [])

    return (
        <div>
            <div className="serverList">
                <LsServer/>
                <SeparatorServer/>
                { props.listServer.map((e) =>
                    <Server info={e} key={e.id} onClick={() => props.setOpenServer([e.id])} />) }
                <AddServer content="Добавить сервер" onClick={() => setDialogState2(true)}/>
                <ActiveCode content="Присоедениться к серверу" onClick={() => setDialogState(true)}/>
            </div>
            <Dialog active={dialogState} setActive={setDialogState}>
                {/*<AddServerDialog backClick={() => setDialogState(false)} successful={getServer}/>*/}
                <ActivateCodeDialog backClick={() => setDialogState(false)} successful={getServer}/>
            </Dialog>
            <Dialog active={dialogState2} setActive={setDialogState2}>
                <AddServerDialog backClick={() => setDialogState2(false)} successful={getServer}/>
            </Dialog>
        </div>
    );
};

export default ServerList;