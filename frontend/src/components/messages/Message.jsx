import React from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { useConversation } from '../../zustand/useConversation.js';
import { MessageFilePreview } from '../filePreview/MessageFilePreview.jsx';

const base64ToBlob = (base64str) => {
    if (!base64str) return;
    let BASE64_MARKER = ';base64,';
    let base64Index = base64str.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = base64str.substring(base64Index)
    var binary = atob(base64.replace(/\s/g, ""));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }

    var blob = new Blob([view], {
        type: "audio/wav",
    });
    return blob;
};

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    let profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bgColor = fromMe ? 'bg-emerald-600' : 'bg-emerald-800';
    const audioBlob = base64ToBlob(message.userSendVoiceNotes);

    if (!fromMe) {
        const profile = selectedConversation.members?.find((e) => e._id == message.senderId)?.profilePicture;
        if (profile) {
            profilePicture = profile;
        }
    }
    const isFile = Boolean(message.userSendFile);

    return (
        <div className={`chat ${chatClassName} mt-4`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePicture} alt="user img" />
                </div>
            </div>

            <div className={`chat-bubble text-white ${bgColor} pb-2 flex gap-2`}>

                {isFile && (
                    <MessageFilePreview
                        fileSize={message.fileSize}
                        fileName={message.message}
                        file={message.userSendFile}
                    />
                )} {!message.userSendFile && (
                    message.message
                )} {message.userSendVoiceNotes &&
                    <audio controls className='w-52'>
                        <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                    </audio>
                }

                <div className='chat-footer opacity-70 text-xs flex gap-1 items-end text-white'>{formattedTime}</div>
            </div>
        </div>
    );
}

export default Message;