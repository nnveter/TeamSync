import React, {useEffect, useState} from 'react';
import axios from "axios";
import {URL} from "@/strings/constants";
import {getJwt} from "@/other/getjwt";
import Categories from "./Categories";
import Channel from "./Channel";
import ContextMenu from "@/components/main/ContextMenu";
import CreateCategoriesDialog from "@/components/LeftDopPanel/Dialog/CreateCategoriesDialog";
import CreateChannelDialog from "@/components/LeftDopPanel/Dialog/CreateChannelDialog";
import InviteFriendDialog from "@/components/LeftDopPanel/Dialog/InviteFriendDialog";
import Dialog from "@/components/main/Dialog";

const ChannelList = (props) => {

    const [categories, setCategories] = useState([])
    const [channel, setChannel] = useState([])

    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    const [isShowCreateCategoriesDialog, setIsShowCreateCategoriesDialog] =useState(false)
    const [isShowCreateChannelDialog, setIsShowCreateChannelDialog] =useState(false)

    const [isShowInviteFriendDialog, setIsShowInviteFriendDialog] =useState(false)
    const [InviteFriendCode, setInviteFriendCode] =useState("")

    const handleContextMenu = (e) => {
        e.preventDefault();
        if (props.serverId[0] !== undefined){
            props.setShowContextMenuChannelList(true);
            setContextMenuPosition({ x: e.clientX, y: e.clientY });
        }
    };

    function createInvite(spaceId){
        axios({
            url: URL + "invitations",
            method: "post",
            headers: {'Authorization': "Bearer " + getJwt().access},
            data: {
                "activationsLeft": 100000,
                "expirationTimeInSeconds": 604800,
                "spaceId": spaceId
            }
        }).then(r => {
            setInviteFriendCode(r.data.value)
            setIsShowInviteFriendDialog(true)
        }).catch(e => {
            console.log(e)
        })
    }

    function refreshChannels(){
        if (props.serverId[0]){
            axios({
                url: URL + `channels/space/${props.serverId}/group/category`,
                method: "get",
                headers: {'Authorization': "Bearer " + getJwt().access}
            })
                .then(r => {
                    setChannel(r.data)
                })
                .catch(() => {

                })

            axios({
                url: URL + `categories/space/${props.serverId}`,
                method: "get",
                headers: {'Authorization': "Bearer " + getJwt().access}
            })
                .then(r => {
                    setCategories(r.data)
                })
                .catch(() => {

                })
        } // TODO: сделать ls
        props.setrefreshListServer(false)
    }

    useEffect(() => {
        refreshChannels()
    }, [props.serverId, props.refreshListServer])


    return (
        <div className="channelList" onContextMenu={handleContextMenu} >
            <Dialog active={isShowCreateCategoriesDialog} setActive={setIsShowCreateCategoriesDialog}>
                <CreateCategoriesDialog setIsShowCreateCategoriesDialog={setIsShowCreateCategoriesDialog}/>
            </Dialog>
            <Dialog active={isShowCreateChannelDialog} setActive={setIsShowCreateChannelDialog}>
                <CreateChannelDialog refreshChannels={refreshChannels} spaceId={props.serverId} setIsShowCreateChannelDialog={setIsShowCreateChannelDialog}/>
            </Dialog>
            <Dialog active={isShowInviteFriendDialog} setActive={setIsShowInviteFriendDialog}>
                <InviteFriendDialog code={InviteFriendCode} setIsShowInviteFriendDialog={setIsShowInviteFriendDialog}/>
            </Dialog>
            {props.showContextMenuChannelList && (
                <ContextMenu contextMenuPosition={contextMenuPosition} setShowContextMenuChannelList={props.setShowContextMenuChannelList}>
                    <div className="contextMenuItem" onClick={() => setIsShowCreateChannelDialog(true)}>Создать канал</div>
                    <div className="contextMenuItem" onClick={() => setIsShowCreateCategoriesDialog(true)}>Создать категорию</div>
                    <div className="contextMenuItem SpecialTextEdition" onClick={() => createInvite(props.serverId[0])}>Пригласить людей</div>
                </ContextMenu>
            )}
            <div className="separatorChannelList"/>
            {channel["-1"]?.map(j => <Channel id={j.id} title={j.title}
                                              activeChannel={props.openChannel} setActiveChannel={props.setOpenChannel}
                                              connectMessage={props.connectMessage} setIsShowSettings={props.setIsShowSettings} key={j.id}/>)}
            <div className="separatorChannelList"/>
            { categories.map(v =>
                <>
                <Categories name={v.title} key={v.id}>
                    {channel[`${v.id}`]?.map(i => <Channel id={i.id} title={i.title} activeChannel={props.openChannel} setActiveChannel={props.setOpenChannel}
                                                           connectMessage={props.connectMessage} setIsShowSettings={props.setIsShowSettings} key={i.id}/>)}
                </Categories>
                <div className="separatorChannelList"/>
                </>
            )

            }
        </div>
    );
};

export default ChannelList;