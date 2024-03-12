import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    //const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxY2ZhZjQwOGIwZjFiZDJlMmE2MDQiLCJpYXQiOjE3MDkyOTc1ODMsImV4cCI6MTcxOTY2NTU4M30.Jw5_CRDsTk9hHA9whD7joidLGHl5PumzrsYPYMwcnSE";
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getUserToken}`
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch conversations');
                }
                const data = await res.json();
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversations();
    }, []);
    return { conversations, loading };
    //return { selectedConversation, setSelectedConversation};
}

export default useGetConversations;