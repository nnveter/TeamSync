import React, {useEffect, useState} from 'react';

const Settings = ({names, isShow, setIsShow, ...props}) => {


    const [activeSetting, setActiveSetting] = useState(0)

    useEffect(() => {
        if (names.length !== props.children.length){
            console.warn(`Warning: The number of elements of the names array is not the same as children \nnames.length = ${names.length} \nchildren.length = ${props.children.length}`)
        }
    }, [names, props])

    return (
        <div className={!isShow ? "settingsMainDiv unShow" : "settingsMainDiv"}>
            <div className="settingsLeftDiv">
                <div className="settingsList">
                    {names.map((e) =>
                        <div className={activeSetting === e.id ? "settingsName active" : "settingsName"} onClick={() => setActiveSetting(e.id)} key={e.id}>{e.title}</div>
                    )}
                </div>
            </div>
            <div className="settingsRightDiv">
                {props.children[activeSetting]}
            </div>
        </div>
    );
};

export default Settings;