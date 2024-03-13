import { useState } from 'react'
import { MdOutlineCameraAlt } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { TiMicrophoneOutline } from "react-icons/ti";
import useSendMessage from '../../hooks/useSendMessage';

const MessagesInput = () => {

  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-96 relative flex items-center justify-between'>

        <button type='submit' className='left-1 bg-emerald-500 p-3 mr-1 rounded-full'>
          {loading ? <div className='loading loading-spinner'></div> : <MdOutlineCameraAlt className='w-5 h-5 text-black' />}
        </button>

        <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black'
          placeholder='Message here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type='submit' className='absolute inset-y-0 end-0 items-center pe-2'>
          {loading ? <div className='loading loading-spinner'></div> : <TbSend className='w-5 h-5 text-black' />}
        </button>
        <div className='flex flex-1 items-center justify-center relative'>
          <button type='submit' className='absolute left-1 bg-emerald-500 p-3 rounded-full'>
            {loading ? <div className='loading loading-spinner'></div> : <TiMicrophoneOutline className='w-5 h-5 text-black' />}
          </button>
        </div>
      </div>
    </form>
  )
}

export default MessagesInput



//STARTER CODE SNIPPET

// import React from 'react'
// import { BsSendFill } from "react-icons/bs";

// const MessagesInput = () => {
//   return (
//     <form className='px-4 my-3'>
//       <div className='w-full'>
//         <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black' placeholder='Message here...' />

//         <button type='submit' className='absolute inset-y-0 end-0 items-center pe-3 text-black'>
//           <BsSendFill />
//         </button>
//       </div>
//     </form>
//   )
// }

// export default MessagesInput