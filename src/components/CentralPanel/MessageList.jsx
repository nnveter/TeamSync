import React from 'react';

const MessageList = ({openChannel, messageList}) => {



    return (
        <div className="messageList">
            <div className="endPointMessage"> </div>
            {messageList.map((e) =>
                <div className="message" key={e.id}>
                    <div>
                        <div className="avatar"></div>
                    </div>
                    <div>
                        <div className="messageTopContainer">
                            <div className="messageUserName">
                                {e.owner?.lastName + " " + e.owner?.firstName}
                            </div>
                            <div className="messageDate">{e.createdAt[2] +
                                "." + e.createdAt[1]+
                                "." + e.createdAt[0] +
                                " " + e.createdAt[3] +
                                ":" + e.createdAt[4]}
                            </div>
                        </div>
                        <div className="valueMessage">{e.value}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default MessageList;