import React from 'react';

const Dialog = (props) => {
    return (
        <div className={props.active ? "Dialog active" : "Dialog"} onClick={() => props.setActive(false)}>
            <div className="DialogContent" onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default Dialog;