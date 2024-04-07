import { useState } from 'react';
import toast from 'react-hot-toast';

const useSendGroup = () => {
    const [submissionMessage] = useState('');

    const sendGroupData = async (groupName, groupDescription, selectedUsers, profilePic) => {
        if (selectedUsers.length > 0 && groupName && groupDescription) {

            const groupToken = document.cookie.split("=")[1];
            const userId = JSON.parse(localStorage.getItem("chat-user"))._id;

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
                        members: [...selectedUsers, userId],
                        profilePicture: profilePic,
                    }),
                });

                const data = await res.json();

                if (data.error) throw new Error(data.error);
                return true;

            } catch (error) {
                toast.error(error.message);
                return false;
            }
        }
    };

    return { submissionMessage, sendGroupData };
};

export default useSendGroup;