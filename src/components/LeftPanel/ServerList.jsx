import React, {useEffect, useState} from 'react';
import Server from "./Server";
import SeparatorServer from "./SeparatorServer";
import AddServer from "./AddServer";
import LsServer from "./LsServer";
import axios from "axios";
import {URL} from "@/strings/constants";
import {getJwt} from "@/other/getjwt";
import AddServerDialog from "./Dialog/AddServerDialog";
import Dialog from "../main/Dialog";
import ActivateCodeDialog from "./Dialog/ActivateCodeDialog";
import ActiveCode from "./ActiveCode";

const ServerList = (props) => {

    const [dialogState, setDialogState] = useState(false)
    const [dialogState2, setDialogState2] = useState(false)

    const [serverHover, setServerHover] = useState([])

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
            .catch((e) => {
                console.log("Не удаёться получить сервера пользователя")
                console.log(e.response)
            })
    }

    function getStateHover(openServer, serverHover, equalsIs){
        if (openServer === equalsIs){
            return "serverIndicator active"
        }
        else{
            if (serverHover === equalsIs){
                return "serverIndicator hover"
            }
            else{
                return "serverIndicator"
            }
        }
    }

    useEffect(getServer, [])

    return (
        <div>
            <div className="serverList">
                <div style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
                    <div className={getStateHover(props.openServer[0], serverHover[0], -1)}></div>
                    <LsServer onHover={setServerHover}/>
                </div>
                <SeparatorServer/>
                { props.listServer.map((e) =>
                    <div style={{display: "flex", alignContent: "center", justifyContent: "center"}} key={e.id}>
                        <div className={getStateHover(props.openServer[0], serverHover[0], e.id)} key={`serverIndicator-${e.id}`}></div>
                        <Server info={e} key={`server-${e.id}`} onHover={setServerHover} onClick={() => props.setOpenServer([e.id])} />
                    </div>
                )}
                <AddServer content="Добавить сервер" onClick={() => setDialogState2(true)}/>
                <ActiveCode content="Присоедениться к серверу" onClick={() => setDialogState(true)}/>
            </div>
            <Dialog active={dialogState} setActive={setDialogState}>
                <ActivateCodeDialog backClick={() => setDialogState(false)} successful={getServer}/>
            </Dialog>
            <Dialog active={dialogState2} setActive={setDialogState2}>
                <AddServerDialog backClick={() => setDialogState2(false)} successful={getServer}/>
            </Dialog>
        </div>
    );
};

export default ServerList;