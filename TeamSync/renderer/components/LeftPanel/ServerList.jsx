import React, {useState} from 'react';
import Server from "./Server";
import SeparatorServer from "./SeparatorServer";
import AddServer from "./AddServer";
import LsServer from "./LsServer";

const ServerList = (props) => {

    const [listServer, setListServer] = useState(
        [{id: 1, name: "name1", notification: 0, srcImage: "https://cdn.discordapp.com/icons/1026573870121091082/d2bc418df794b0a10fef64999e373055.webp?size=128"},
            {id: 2, name: "name2", notification: 0, srcImage: "https://cdn.discordapp.com/icons/1026573870121091082/d2bc418df794b0a10fef64999e373055.webp?size=128"},
            {id: 3, name: "name3", notification: 12, srcImage: "https://cdn.discordapp.com/icons/1026573870121091082/d2bc418df794b0a10fef64999e373055.webp?size=128"},
            {id: 4,name: "name4", notification: 0, srcImage: "https://cdn.discordapp.com/icons/1026573870121091082/d2bc418df794b0a10fef64999e373055.webp?size=128"}]
    )

    return (
        <div className="serverList">
            <LsServer/>
            <SeparatorServer/>
            { listServer.map((e) => <Server info={e} key={e.id}></Server>) }
            <AddServer onClick={props.addServerClick}/>
        </div>
    );
};

export default ServerList;