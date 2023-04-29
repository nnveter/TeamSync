import React from 'react';

function ContextMenu(props) {

    return (
        <div onClick={(e) => e.stopPropagation()} className="contextMenu" style={{position:"absolute", top: props.contextMenuPosition.y, left: props.contextMenuPosition.x}}>
            {props.children}
        </div>
    );
}

export default ContextMenu;
