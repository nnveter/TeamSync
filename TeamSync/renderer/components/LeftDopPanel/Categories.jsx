import React, {useState} from 'react';
import Tooltip from "../Other/Tooltip";

const Categories = (props) => {

    const [active, setActive] = useState(true)

    return (
        <div>
            <div className="divCategories" onClick={() => setActive(!active)}>
                <div>
                    <svg className={active ? "svgCategories" : "svgCategories unActive"} width="12" height="12" viewBox="0 0 24 24">
                        <g fill="">
                            <path fill="currentColor"
                                  d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>
                        </g>
                    </svg>
                    <text className="textCategories">{props.name}</text>
                </div>
                <Tooltip content="Создать канал" position="top" mrginLeft={-70} margintBottom={5}>
                    <div className='addChannelSvg' onClick={e => e.stopPropagation()}>
                        <svg aria-hidden="true" width="18" height="18"
                             viewBox="0 0 18 18">
                            <polygon fill="currentColor"
                                     points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                        </svg>
                    </div>
                </Tooltip>

            </div>
            <div>
                {active && props.children}
            </div>
        </div>
    );
};

export default Categories;