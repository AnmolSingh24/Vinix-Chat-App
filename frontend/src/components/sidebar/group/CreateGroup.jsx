import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoCheckmarkSharp } from "react-icons/io5";
import useSendGroup from '../../../hooks/useSendGroup';

const CreateGroup = ({ selectedUsers, setSelectedUsers }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [showComponent, setShowComponent] = useState(false);

    const { submissionMessage, sendGroupData } = useSendGroup();

    const handleCreateGroup = () => {
        setShowCheckboxes(true);
        setSelectedUsers([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await sendGroupData(groupName, groupDescription, selectedUsers);

        if (success) {
            setShowComponent(false); // Hide the component after submission
            toast.success("Group created successfully");
        }
    };

    return (
        <>
            {!showComponent && (
                <div className='flex items-center justify-end -mt-[0.3rem] mr-4'>
                    <button type="button" className='w-12 h-12 flex items-center justify-center bg-emerald-500 text-white rounded-full' onClick={() => setShowComponent(true)}>
                        <IoCheckmarkSharp className="w-6 h-6 text-white" />
                    </button>
                </div>
            )}

            {showComponent && (
                <div className='flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-2xl'>
                    <div className='w-full p-6 -mt-[25rem] ml-22 rounded-lg shadow-md bg-white border boredr-black'>
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
                            <div className='flex items-center justify-end mt-6'>
                                <button type="button" className='w-20 h-8 bg-emerald-500 text-white rounded' onClick={handleSubmit}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateGroup;