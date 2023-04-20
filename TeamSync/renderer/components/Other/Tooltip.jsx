import React, {useEffect, useState} from 'react';

const Tooltip = (props) => {

    const [active, setActive] = useState(false)

    useEffect(() => {

    }, [])
    return (
        <div className="tooltipDiv" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            {props.children}
            {<div className={active ? "tooltip " + props.position : "tooltip " + props.position + " unActive"} style={{marginLeft: props.mrginLeft, marginBottom: props.margintBottom}}>
                <text>{props.content}</text>
            </div>}
        </div>
    );
};

export default Tooltip;