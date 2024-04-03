import { useState } from 'react';
import toast from 'react-hot-toast';

const useSendGroup = () => {
    const [submissionMessage, setSubmissionMessage] = useState('');

    const sendGroupData = async (groupName, groupDescription, selectedUsers, profilePicture) => {
        if (selectedUsers.length > 0 && groupName && groupDescription) {
            const groupToken = document.cookie.split("=")[1];
            try {
                const res = await fetch('/api/users/groups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${groupToken}`
                    },
                    body: JSON.stringify({
                        groupName: groupName,
                        groupDescription: groupDescription,
                        members: selectedUsers,
                        profilePicture: profilePicture,
                    }),
                });

                if (!res.ok) {
                    throw new Error('Failed to create group');
                }

                const data = await res.json();
                console.log("Group created with users:", data);
                setSubmissionMessage('Group created successfully');
                return true;
            } catch (error) {
                toast.error(error.message);
                console.error('Error creating group:', error.message);
                setSubmissionMessage('Failed to create group. Please try again later.');
                return false;
            }
        }
    };

    return { submissionMessage, sendGroupData };
};

export default useSendGroup;