import React from 'react';
import Tooltip from "../Other/Tooltip";

const AddServer = (props) => {

    return (
        <Tooltip content={props.content} position="right">
            <div className="addServerFrame" title="Создать сервер" onClick={props.onClick}/>
        </Tooltip>
    );
};

export default AddServer;