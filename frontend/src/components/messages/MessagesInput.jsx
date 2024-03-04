import React from 'react'
import { TbSend } from "react-icons/tb";

const MessagesInput = () => {
  return (
    <form className='px-4 my-3'>
      <div className='w-full relative'>
        <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black' placeholder='Message here...' />

        <button type='submit' className='absolute inset-y-0 end-0 items-center pe-3 text-black'>
          <TbSend />
        </button>
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