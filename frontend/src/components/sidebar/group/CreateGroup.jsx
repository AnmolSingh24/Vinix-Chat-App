import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdGroups } from "react-icons/md";
import useSendGroup from '../../../hooks/useSendGroup';
import useGetConversations from '../../../hooks/useGetConversations';
import { AiOutlineCamera } from "react-icons/ai";
import useListenGroup from '../../../hooks/useListenGroup';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupImage, setGroupImage] = useState(null);
    const [showComponent, setShowComponent] = useState(false);
    const fileInputRef = useRef(null);

    const { conversations } = useGetConversations();
    const { sendGroupData } = useSendGroup();
    const newGroup = useListenGroup();

    const handleToggleSelectUser = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGroupImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const success = await sendGroupData(groupName, groupDescription, selectedUsers, groupImage);

        if (success) {
            setShowComponent(false);
            toast.success("Group created successfully");
            notifyUsers(groupName, selectedUsers);
        }

        if (groupName === "" || groupDescription === "" || selectedUsers.length === 0) {
            toast.error("Please fill in all fields");
        }
    };

    const notifyUsers = (groupName, selectedUsers) => {
        {newGroup &&
            // Here you can implement the logic to send a notification to each selected user
            //toast.success('notification', { userId, message: `You have been added to the group: ${groupName}` });
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Emilia Gates
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    You have been added to the group: ${groupName}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ))
        }
    };

    const handleHideComponent = () => {
        setShowComponent(false);
    };

    return (
        <>
            <button type='submit' className="text-black pt-2.5 w-40 flex items-center justify-center gap-2" onClick={() => setShowComponent(true)}>
                <MdGroups className="w-6 h-6 text-black" />
                Create Group
            </button>

            {showComponent && (
                <div className='fixed top-0 bottom-40 pr-10 left-[36.5rem] bg-white -translate-x-[50%] md:min-w-[450px] h-[40rem] z-50 rounded shadow-md'>
                    <div className='w-full p-6 bg-white'>
                        <h1 className='text-3xl font-semibold text-center text-black'>Create Group</h1>
                        <div className='mt-6 flex items-center justify-start gap-4'>

                            <div className='flex items-center justify-center bg-gray-200 w-16 h-16 rounded-full'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <button onClick={() => fileInputRef.current.click()}>
                                    {groupImage ? (
                                        <img src={groupImage} alt="Group" className="w-16 h-16 rounded-full" />
                                    ) : (
                                        <AiOutlineCamera className="w-10 h-10 p-2 rounded-full text-black" />
                                    )}
                                </button>
                            </div>

                            <div>
                                <label className='label p-2'>
                                    <span className='text-base label-text text-black'>Group Name</span>
                                </label>
                                <input
                                    type='text'
                                    name='groupName'
                                    className='input w-80 input-bordered h-10 bg-gray-50 text-black'
                                    placeholder='Enter Group Name'
                                    autoComplete='off'
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </div>
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

                    <button className="absolute top-2 right-4 text-black" onClick={handleHideComponent}>x</button>
                    <div className='divider px-0.5 m-0'></div>
                    <h2 className='text-black font-bold ml-[3rem] text-xl'>Select Users</h2>

                    <div className="grid grid-cols-2 gap-3 mt-5 ml-7">
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

export default CreateGroup;