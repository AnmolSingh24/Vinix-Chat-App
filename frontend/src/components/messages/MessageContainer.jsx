import { useEffect } from 'react';
import useGetConversations from '../../hooks/useGetConversations';
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import { TiMessages } from "react-icons/ti";
import { FaVideo } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {

    const { selectedConversation, setSelectedConversation } = useGetConversations();
    //console.log("No Chats Selected: ", selectedConversation);

    useEffect(() => {
        //cleanup function (unmounts)
        //return () => setSelectedConversation(null);
    }, [setSelectedConversation]);


    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* <Header/> */}
                    <div className='flex items-center gap-40 bg-emerald-500 px-4 py-3.5'>
                        <span className='label-text text-gray-100 font-semibold'>To : </span>
                        <span className='text-gray-200 font-bold'>
                            {selectedConversation.fullname}
                        </span>

                        <div className='flex justify-end gap-6 mr-6'>
                            <button>
                                <FaVideo className='w-5 h-5 text-white' />
                            </button>
                            <div>
                                <button>
                                    <IoMdCall className='w-5 h-5 text-white' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Messages />
                    <MessagesInput />
                </>
            )}
        </div>
    );
}

export default MessageContainer;


const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-white font-semibold flex flex-col items-center gap-2'>
                <p>Welcome {authUser.fullname}</p>
                <p>Start Messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
}



//STARTER CODE SNIPPET

// import React from 'react'
// import Messages from './Messages'
// import MessagesInput from './MessagesInput'

// const MessageContainer = () => {
//     return (
//         <div className='md:min-w-[450px] flex flex-col'>
//             <>
//                 {/* <Header/> */}
//                 <div className='bg-slate-500 px-4 py-2 mb-2'>
//                     <span className='label-text'>To:</span>{" "}
//                     <span className='text-gray-900 font-bold'>John Doe</span>
//                 </div>

//                 <Messages />
//                 <MessagesInput/>
//             </>
//         </div>
//     )
// }

// export default MessageContainer