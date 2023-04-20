import React from 'react';
import axios from "axios";
import {URL} from "../../strings/constants";
import {getJwt} from "../../other/getjwt";
import Tooltip from "../Other/Tooltip";

const Server = (props) => {

    function test(){
        axios({
            url: URL + "channels",
            method: "post",
            data: {spaceId: props.info.id, title:"8888888888888888"},
            headers: {'Authorization': "Bearer " + getJwt().access}
        })
            .then(r => {

            })
            .catch((e) => {
                console.log(e.response.data)
            })
    } // TODO: переместить

    return (
        <Tooltip content={props.info.title} position={"right"}>
            <div className="serverFrame" onClick={props.onClick} onDoubleClick={test}
                 title={props.info.title}
                 style={{ backgroundImage: `url(${props.info.srcImage})`, backgroundSize: 'cover' }}/>
        </Tooltip>
    );
};

export default Server;