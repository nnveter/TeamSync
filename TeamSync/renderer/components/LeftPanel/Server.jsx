import React from 'react';
import axios from "axios";
import {URL} from "../../strings/constants";
import {getJwt} from "../../other/getjwt";

const Server = (props) => {

    function test(){
        axios({
            url: URL + "channels",
            method: "post",
            data: {spaceId: props.info.id, title:"первый канал 5"},
            headers: {'Authorization': "Bearer " + getJwt().access}
        })
            .then(r => {

            })
            .catch((e) => {
                console.log(e.response.data)
            })
    } // TODO: переместить

    return (
        <div className="serverFrame" onClick={props.onClick} onDoubleClick={test}
             title={props.info.title}
             style={{ backgroundImage: `url(${props.info.srcImage})`, backgroundSize: 'cover' }}/>
    );
};

export default Server;