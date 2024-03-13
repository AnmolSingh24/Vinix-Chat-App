import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversations from '../../zustand/useConversation.js';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversations();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bgColor = fromMe ? 'bg-emerald-600' : 'bg-emerald-800';

    return (
        <div className={`chat ${chatClassName} mt-4`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePicture} alt="user img" />
                </div>
            </div>

            <div className={`chat-bubble text-white ${bgColor} pb-2 flex gap-2`}>
                {message.message}
                <div className='chat-footer opacity-50 text-xs flex gap-1 items-end text-white'>{formattedTime}</div>
            </div>
        </div>
    )
}

export default Message



//STARTER CODE SNIPPET

// import React from 'react'

// const Message = () => {
//     return (
//         <div className='chat chat-end'>
//             <div className='chat-image avatar'>
//                 <div className='w-10 rounded-full'>
//                     <img src="#" alt="user img" />
//                 </div>
//             </div>

//             <div className={'chat-bubble text-white bg-emerald-600'}>Hii, Whassup?</div>
//             <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:00 pm</div>
//         </div>
//     )
// }

// export default Message