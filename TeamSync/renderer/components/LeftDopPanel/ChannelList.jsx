import React, {useEffect, useState} from 'react';
import axios from "axios";
import {URL} from "../../strings/constants";
import {getJwt} from "../../other/getjwt";
import Categories from "./Categories";
import Channel from "./Channel";

const ChannelList = (props) => {

    const [categories, setCategories] = useState([])
    const [channel, setChannel] = useState([])

    useEffect(() => {
        if (props.serverId[0]){
            axios({
                url: URL + `channels/space/${props.serverId}/group/category`,
                method: "get",
                headers: {'Authorization': "Bearer " + getJwt().access}
            })
                .then(r => {
                    setChannel(r.data)
                })
                .catch(() => {

                })

            axios({
                url: URL + `categories/space/${props.serverId}`,
                method: "get",
                headers: {'Authorization': "Bearer " + getJwt().access}
            })
                .then(r => {
                    setCategories(r.data)
                })
                .catch(() => {

                })
        } // TODO: сделать ls
        props.setrefreshListServer(false)
    }, [props.serverId, props.refreshListServer])
    return (
        <div className="channelList">
            <div className="separatorChannelList"/>
            {channel["-1"]?.map(j => <Channel id={j.id} title={j.title} activeChannel={props.openChannel} setActiveChannel={props.setOpenChannel} connectMessage={props.connectMessage} key={j.id}/>)}
            <div className="separatorChannelList"/>
            { categories.map(v =>
                <>
                <Categories name={v.title} key={v.id}>
                    {channel[`${v.id}`]?.map(i => <Channel id={i.id} title={i.title} activeChannel={props.openChannel} setActiveChannel={props.setOpenChannel} key={i.id}/>)}
                </Categories>
                <div className="separatorChannelList"/>
                </>
            )

            }
        </div>
    );
};

export default ChannelList;