import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {loading ? <span className='loading loading-spinner mx-auto'></span> : conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  )
}

export default Conversations;




//STARTER CODE SNIPPET

// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//     </div>
//   )
// }

// export default Conversations