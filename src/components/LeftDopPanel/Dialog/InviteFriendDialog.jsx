import React, {useState} from 'react';

const InviteFriendDialog = (props) => {

    return (
        <div>
            <h1>Код приглашения</h1>
            <div className="codeText">{props.code}</div>
            <div className="descriptionText">Код приглашения действителен в течении 7 дней</div>
        </div>
    );
};

export default InviteFriendDialog;