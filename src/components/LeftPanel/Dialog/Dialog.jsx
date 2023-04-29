import React from 'react';

const Dialog = (props) => {
    return (
        <div className={props.active ? "addServerDialog active" : "addServerDialog"} onClick={() => props.setActive(false)}>
            <div className="addServerDialogContent" onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default Dialog;