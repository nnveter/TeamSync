import React, {useState} from 'react';
import axios from "axios";
import {URL} from "@/strings/constants";
import {getJwt} from "@/other/getjwt";

const AddServerDialog = (props) => {

    const [name, setName] = useState("")
    function OnClick(){
        if (name.length >= 3){
        axios({
            url: URL + "spaces",
            method: "post",
            data: {title: name},
            headers: {'Authorization': "Bearer " + getJwt().access}
        })
            .then(r => {
                console.log(r.data)
                props.successful(r?.data?.id)
            })
            .catch((e) => {
                console.log(e.response.data)
            })
        }
    }

    return (
                <div className="addServerDialogDiv">
                    <h1>Персонализируйте свой сервер</h1>
                    <text>Персонализируйте свой новый сервер, выбрав ему название и значок. Их можно будет изменить в любой момент.</text>
                    <div className="photoDiv">
                        <div className="addPhotoServerDialog"/>
                    </div>
                    <div className="inputBox" style={{width: `93.5%`, margin: `30px 25px 0 20px`}}>
                        <input type="text" required="required" value={name} onChange={e => setName(e.target.value)}/>
                        <span>Название сервера</span>
                    </div>
                    <div className="buttonContainer">
                        <button className="backButton" onClick={props.backClick}>Отмена</button>
                        <button className="finishButton" onClick={OnClick}>Создать</button>
                    </div>
                </div>
    );
};

export default AddServerDialog;