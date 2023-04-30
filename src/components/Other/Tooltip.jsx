import React, {useEffect, useState} from 'react';

const Tooltip = ({position, content, marginLeft, marginBottom, ...props}) => {

    const [active, setActive] = useState(false)

    useEffect(() => {

    }, [])
    return (
        <div className="tooltipDiv" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            {props.children}
            {<div className={active ? "tooltip " + position : "tooltip " + position + " unActive"} style={{marginLeft: marginLeft, marginBottom: marginBottom}}>
                <div className="tooltipText">{content}</div>
            </div>}
        </div>
    );
};

export default Tooltip;