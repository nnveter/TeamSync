import React from 'react';
import myPng from '../../public/images/22.png';
import Image from "next/image";
import Tooltip from "../Other/Tooltip";

const LsServer = (props) => {

    function click(){
        return
    }

    return (
        <Tooltip content="Личные сообщения" position="right">
            <div className="lsServerFrame" onClick={click}
                 onMouseEnter={() => props.onHover([-1])} onMouseLeave={() => props.onHover([])}>
                <Image src={myPng} alt="" width={23} height={30}/>
            </div>
        </Tooltip>
    );
};

export default LsServer;