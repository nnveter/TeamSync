import React from 'react';

const AddServer = (props) => {

    return (
        <div className="addServerFrame" title="Создать сервер" onClick={props.onClick}/>
    );
};

export default AddServer;