import React from 'react';

const Server = (props) => {
    console.log(props.id)
    return (
        <div className="serverFrame" title={props.info.name}  style={{ backgroundImage: `url(${props.info.srcImage})`, backgroundSize: 'cover' }} >
            {!props.info.srcImage && <text>{props.info.name}</text>}
        </div>
    );
};

export default Server;