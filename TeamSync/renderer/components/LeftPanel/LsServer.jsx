import React from 'react';
import myPng from '../../public/images/22.png';
import Image from "next/image";
import Tooltip from "../Other/Tooltip";
const LsServer = () => {

    function click(){
        return
    }

    return (
        <Tooltip content="Личные сообщения" position="right">
            <div className="lsServerFrame" onClick={click}>
                <Image src={myPng} alt="" width={23} height={30}/>
            </div>
        </Tooltip>
    );
};

export default LsServer;