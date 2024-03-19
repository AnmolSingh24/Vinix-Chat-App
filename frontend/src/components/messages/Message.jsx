import React from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversations from '../../zustand/useConversation.js';
import { MessageFilePreview } from '../filePreview/MessageFilePreview.jsx'; // Import MessageFilePreview component

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversations();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bgColor = fromMe ? 'bg-emerald-600' : 'bg-emerald-800';

    const isFile = message.userSendFile.length !== 0;

    return (
        <div className={`chat ${chatClassName} mt-4`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePicture} alt="user img" />
                </div>
            </div>

            <div className={`chat-bubble text-white ${bgColor} pb-2 flex gap-2`}>
                {isFile ? (
                    <MessageFilePreview
                        fileSize={message.fileSize}
                        fileName={message.message}
                        file={message.userSendFile}
                    />
                ) : (
                    <div className="w-full">
                        {message.message}
                    </div>
                )}
                <div className='chat-footer opacity-70 text-xs flex gap-1 items-end text-white pb-1'>{formattedTime}</div>
            </div>
        </div>
    );
}

export default Message;