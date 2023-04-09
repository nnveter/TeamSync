import React from 'react';

const AddServerDialog = ({active, setActive}) => {
    return (
        <div className={active ? "addServerDialog active" : "addServerDialog"} onClick={() => setActive(false)}>
            <div className="addServerDialogContent" onClick={e => e.stopPropagation()}>
                <div className="addServerDialogDiv">
                    <h1>Персонализируйте свой сервер</h1>
                    <text>Персонализируйте свой новый сервер, выбрав ему название и значок. Их можно будет изменить в любой момент.</text>
                    <div className="photoDiv">
                        <div className="addPhotoServerDialog"/>
                    </div>
                    <div className="inputBox" style={{width: `93.5%`, margin: `30px 25px 0 20px`}}>
                        <input type="text" required="required"/>
                        <span>Название сервера</span>
                    </div>
                    <div className="buttonContainer">
                        <button className="backButton" onClick={() => setActive(false)}>Отмена</button>
                        <button className="finishButton">Создать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddServerDialog;