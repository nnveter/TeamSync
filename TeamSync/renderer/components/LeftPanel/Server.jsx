import React from 'react';

const Server = (props) => {

    function click(){
        return
    }

    return (
        <div className="serverFrame" onClick={click}
             title={props.info.name}
             style={{ backgroundImage: `url(${props.info.srcImage})`, backgroundSize: 'cover' }}/>
    );
};

export default Server;