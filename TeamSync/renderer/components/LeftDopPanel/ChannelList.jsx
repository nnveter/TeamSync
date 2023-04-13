import React, {useEffect, useState} from 'react';
import Channel from "./Channel";
import axios from "axios";
import {URL} from "../../strings/constants";
import {getJwt} from "../../other/getjwt";

const ChannelList = (props) => {

    const [channel, setChannel] = useState([])

    useEffect(() => {
        if (props.serverId[0] !== -1){
            axios({
                url: URL + "channels/space/" + props.serverId,
                method: "get",
                headers: {'Authorization': "Bearer " + getJwt().access}
            })
                .then(r => {
                    setChannel(r.data)
                    console.log(r.data)
                })
                .catch(() => {

                })
        } // TODO: сделать ls
        props.setrefreshListServer(false)
    }, [props.serverId, props.refreshListServer])

    return (
        <div className="channelList">
            { channel.map((e) => <Channel title={e.title} key={e.id}/>)}
        </div>
    );
};

export default ChannelList;