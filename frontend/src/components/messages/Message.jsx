import React from 'react'

const Message = () => {
    return (
        <div className='chat chat-end'>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src="#" alt="user img" />
                </div>
            </div>

            <div className={'chat-bubble text-white bg-emerald-600'}>Hii, Whassup?</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:00 pm</div>
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