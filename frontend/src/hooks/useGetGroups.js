import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGroup } from '../zustand/useConversation';

const useGetGroups = () => {
    const [loadingGroups, setLoading] = useState(false);
    const { groups, setGroups } = useGroup();

    useEffect(() => {
        const getGroups = async () => {
            const getGroupToken = document.cookie.split("=")[1];
            setLoading(true);
            try {
                const res = await fetch(`/api/users/groups`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getGroupToken}`
                    },
                });

                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setGroups(data);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getGroups();
    }, []);
    return { groups, loadingGroups, setGroups };
}

export default useGetGroups;