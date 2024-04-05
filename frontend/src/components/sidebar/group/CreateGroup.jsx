import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineGroups } from 'react-icons/md';
import useSendGroup from '../../../hooks/useSendGroup';
import useGetConversations from '../../../hooks/useGetConversations';

const SelectUsers = () => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showComponent, setShowComponent] = useState(false);

    const { conversations } = useGetConversations();
    const { submissionMessage, sendGroupData } = useSendGroup();

    const handleToggleSelectUser = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const handleSubmit = async () => {
        const success = await sendGroupData(groupName, groupDescription, selectedUsers);

        if (success) {
            setShowComponent(false);
            toast.success("Group created successfully");
        }
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
                <div className='fixed top-0.5 bottom-40 left-[36.4rem] bg-white -translate-x-[50%] md:min-w-[450px] h-[40rem] z-50 rounded shadow-md'>
                    <div className='w-full p-6 bg-white'>
                        <h1 className='text-3xl font-semibold text-center text-black'>Group Details</h1>
                        <div className='mt-6'>
                            <div>
                                <label className='label p-2'>
                                    <span className='text-base label-text text-black'>Group Name</span>
                                </label>
                                <input
                                    type='text'
                                    name='groupName'
                                    className='input w-full input-bordered h-10 bg-gray-50 text-black'
                                    placeholder='Enter Group Name'
                                    autoComplete='off'
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='label p-2'>
                                    <span className='text-base label-text text-black'>Group Description</span>
                                </label>
                                <input
                                    type='text'
                                    name='groupDescription'
                                    className='input w-full input-bordered h-10 bg-gray-50 text-black'
                                    placeholder='Enter Group Description'
                                    autoComplete='off'
                                    value={groupDescription}
                                    onChange={(e) => setGroupDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button className="absolute top-2 right-4 text-black" onClick={handleHideComponent}>x</button>
                    <h2 className='text-black font-bold ml-[3rem] text-xl'>Select Users</h2>

                    <div className="grid grid-cols-2 gap-4 mt-5 ml-10">
                        {conversations.map((user) => (
                            <div key={user._id} className="flex items-center justify-start gap-2">
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
                    </div>
                    <div className='flex items-center justify-end mt-6 mr-4'>
                        <button type="button" className='w-20 h-8 bg-emerald-500 text-white rounded' onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SelectUsers;