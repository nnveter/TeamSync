import React from 'react';
import myPng from '../../public/images/22.png';
import Image from "next/image";
const LsServer = () => {

    function click(){
        return
    }

    return (
        <div className="lsServerFrame" onClick={click}>
            <Image src={myPng} alt="" width={23} height={30}/>
        </div>
    );
};

export default LsServer;