import React, { useState } from 'react';
import { MdOutlineGroups } from 'react-icons/md';
import useGetConversations from '../../../hooks/useGetConversations';
import CreateGroup from './CreateGroup';

const SelectUsers = () => {
    const [showComponent, setShowComponent] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { conversations } = useGetConversations();

    const handleToggleSelectUser = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const handleHideComponent = () => {
        setShowComponent(false);
    };

    return (
        <>
            <button type='submit' className="text-black pt-2.5 w-40 flex items-center justify-center gap-2" onClick={() => setShowComponent(true)}>
                <MdOutlineGroups className="w-6 h-6 text-black" />
                Create Group
            </button>

            {showComponent && (
                <div className='fixed top-14 bottom-40 left-[32.4rem] bg-white pt-4 -translate-x-[50%] w-80 h-[29rem] z-50 rounded shadow-md'>
                    <button className="absolute top-2 right-4 text-black" onClick={handleHideComponent}>x</button>
                    <h2 className='text-black font-bold ml-[3rem] text-xl'>Select Users</h2>

                    {conversations.map((user) => (
                        <div key={user._id} className="flex items-center justify-start gap-2 mt-5 ml-10">
                            <div className='form-control'>
                                <label className='label gap-2 cursor-pointer'>
                                    <input
                                        type="checkbox"
                                        className='checkbox border-black'
                                        checked={selectedUsers.includes(user._id)}
                                        onChange={() => handleToggleSelectUser(user._id)}
                                    />
                                </label>
                            </div>

                            <div className='rounded-full'>
                                <img src={user.profilePicture} alt="user img" className='w-10 h-10' />
                            </div>

                            <span className="text-black text-base font-semibold">{user.fullname}</span>
                        </div>
                    ))}

                    <CreateGroup selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                </div>
            )}
        </>
    );
}

export default SelectUsers;