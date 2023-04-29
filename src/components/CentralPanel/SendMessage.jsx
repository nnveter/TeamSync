import React, {useState} from 'react';
import axios from "axios";
import {URL} from "@/strings/constants";
import {getJwt} from "@/other/getjwt";

const SendMessage = ({openChannel}) => {

    const [textMessage, setTextMessage] = useState("")

    const handleKeyDown = event => {

        if (event.key === 'Enter') {
            setTextMessage("")
            axios({
                url: URL + `messages`,
                method: "post",
                data: {channelId: openChannel[0], value: textMessage},
                headers: {'Authorization': "Bearer " + getJwt().access}
            })
                .then(r => {
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    };

    return (
        <div className="sendMessage">
            <input className="sendMessageInput" type="text" placeholder="message" value={textMessage} onKeyDown={handleKeyDown} onChange={event => setTextMessage(event.target.value)}/>
        </div>
    );
};

export default SendMessage;