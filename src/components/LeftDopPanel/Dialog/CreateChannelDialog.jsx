import React, {useState} from 'react';
import axios from "axios";
import {URL} from "@/strings/constants";
import {getJwt} from "@/other/getjwt";

const CreateChannelDialog = (props) => {

    const [nameChannel, setNameChannel] = useState("")

    function createChannel(channelName, spaceId){
        console.log(channelName, spaceId)
        axios({
            url: URL + "channels",
            method: "post",
            headers: {'Authorization': "Bearer " + getJwt().access},
            data: {
                spaceId: spaceId,
                title: channelName
            }
        }).then(r => {
            props.refreshChannels()
            props.setIsShowCreateChannelDialog(false)
        }).catch(e => {
            console.log(e.response)
        })
    }

    function checkName(name){
        if (name.length > 3 && name.length < 16){
            return 1
        }
        else{
            return 2
        }
    }

    return (
        <div>
            <h1>Создать канал</h1>
            <div className="inputBox" style={{width: `93.5%`, margin: `30px 25px 0 20px`}}>
                <input type="text" required="required" value={nameChannel} onChange={e => {setNameChannel(e.target.value)}}/>
                <span>Название канала</span>
            </div>
            <div className="buttonContainer">
                <button className="backButton" onClick={() => props.setIsShowCreateChannelDialog(false)}>Назад</button>
                <button className="finishButton activeCode" onClick={() => createChannel(nameChannel, props.spaceId[0])}>Создать канал</button>
            </div>
        </div>
    );
};

export default CreateChannelDialog;