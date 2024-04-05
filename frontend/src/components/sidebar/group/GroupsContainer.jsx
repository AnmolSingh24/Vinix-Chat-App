// import { useEffect } from 'react';
// import { useGroup } from '../../../zustand/useConversation';
// import Messages from '../../messages/Messages'
// import MessagesInput from '../../messages/MessagesInput'
// import { TiMessages } from "react-icons/ti";
// import { useAuthContext } from '../../../context/AuthContext';

// const GroupsContainer = () => {

//   const { selectedGroup, setSelectedGroup } = useGroup();

//   useEffect(() => {
//     //cleanup function (unmounts)
//     return () => setSelectedGroup(null);
//   }, [setSelectedGroup]);

//   return (
//     <div className='md:min-w-[450px] flex flex-col'>
//       {!selectedGroup ? (
//         <NoGroupSelected />
//       ) : (
//         <>
//           {/* <Header/> */}
//           <div className='flex items-start justify-between bg-emerald-600 px-4 py-3.5'>
//             <div className='flex items-center gap-2'>
//               <span className='label-text text-gray-100 font-semibold'>To : </span>
//               <span className='text-gray-100 font-bold'>{selectedGroup.groupName}</span>
//             </div>

//             <div>
//               <span className='text-gray-100 font-base truncate'>{selectedGroup.members}</span>
//             </div>
//           </div>

//           <Messages />
//           <MessagesInput />
//         </>
//       )}
//     </div>
//   );
// }

// export default GroupsContainer;

// const NoGroupSelected = () => {
//   const { authUser } = useAuthContext();
//   return (
//     <div className='flex items-center justify-center w-full h-full'>
//       <div className='px-4 text-center sm:text-lg md:text-xl text-white font-semibold flex flex-col items-center gap-2'>
//         <p>Welcome {authUser.fullname}</p>
//         <p>Start Messaging</p>
//         <TiMessages className='text-3xl md:text-6xl text-center' />
//       </div>
//     </div>
//   );
// }