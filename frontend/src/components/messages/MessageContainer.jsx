import { useEffect } from 'react';
import { useConversation } from '../../zustand/useConversation.js';
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {

  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* <Header/> */}
          <div className='flex flex-col items-start bg-emerald-600 px-4 py-2.5'>
            <div className='flex items-center gap-2'>
              <img src={selectedConversation.profilePicture} alt="profile picture" className='w-10 h-10 rounded-full' />
              <div>
                <span className='text-gray-100 font-bold'>{selectedConversation.fullname}</span>
                {selectedConversation.groupName && (
                  <span className='text-gray-100 font-bold'>{selectedConversation.groupName}</span>
                )}
              </div>
            </div>

            {selectedConversation.members && selectedConversation.members.length > 0 && (
              <div className='-mt-2.5 ml-12'>
                <div className='flex flex-wrap gap-1'>
                  {selectedConversation.members.map((m, idx) => (
                    <span key={idx} className='text-gray-100 text-xs'>{m.fullname}{idx !== selectedConversation.members.length - 1 ? ',' : ''}</span>
                  ))}
                </div>
              </div>
            )}

            {/* <div className='flex items-center gap-6 mt-3'>
              <button>
                <FaVideo className='w-5 h-5 text-white' />
              </button>
              <button>
                <IoMdCall className='w-5 h-5 text-white' />
              </button>
            </div> */}
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
  );
}