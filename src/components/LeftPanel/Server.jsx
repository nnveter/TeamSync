import React from 'react';
import axios from "axios";
import {URL} from "@/strings/constants";
import {getJwt} from "@/other/getjwt";
import Tooltip from "../Other/Tooltip";

const Server = (props) => {

    return (
            <Tooltip content={props.info.title} position={"right"} marginLeft={12}>
                <div className="serverFrame" onClick={props.onClick}
                     onMouseEnter={() => props.onHover([props.info.id])} onMouseLeave={() => props.onHover([])}
                     // style={{ backgroundImage: `url(${props.info.srcImage})`, backgroundSize: 'cover' }}
                     style={{ backgroundSize: 'cover' }}
                />
            </Tooltip>
    );
};

export default Server;