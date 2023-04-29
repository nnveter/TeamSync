import React, {useState} from 'react';
import axios from "axios";
import {URL} from "@/strings/constants";
import {getJwt} from "@/other/getjwt";

const ActivateCodeDialog = (props) => {

    const [code, setCode] = useState("")

    function OnClick(){
        if (code.length >= 3){
            axios({
                url: URL + "invitations/activate/" + code,
                method: "get",
                headers: {'Authorization': "Bearer " + getJwt().access}
            })
                .then(r => {
                    console.log(r.data)
                    props.successful(r?.data?.space?.id)
                })
                .catch((e) => {
                    console.log(e.response.data)
                })
        }
    }

    return (
        <div>
            <h1>Присоединиться к серверу</h1>
            <text>Введите приглашение, чтобы присоединиться к существующему серверу.</text>
            <h2></h2>
            <div className="inputBox" style={{width: `93.5%`, margin: `30px 25px 0 20px`}}>
                <input type="text" required="required" value={code} onChange={e => setCode(e.target.value)}/>
                <span>Код</span>
            </div>
            <h2 className="activeCodeH2">Приглашения должны выглядеть так:</h2>
            <text>hTKzmak</text>
            <div className="buttonContainer">
                <button className="backButton" onClick={props.backClick}>Назад</button>
                <button className="finishButton activeCode" onClick={OnClick}>Присоедениться к серверу</button>
            </div>
        </div>
    );
};

export default ActivateCodeDialog;