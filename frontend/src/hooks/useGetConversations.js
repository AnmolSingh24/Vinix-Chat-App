import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            const getUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxY2ZhZjQwOGIwZjFiZDJlMmE2MDQiLCJpYXQiOjE3MDkyOTc1ODMsImV4cCI6MTcxOTY2NTU4M30.Jw5_CRDsTk9hHA9whD7joidLGHl5PumzrsYPYMwcnSE";
            setLoading(true);
            try {
                const res = await fetch('/api/users', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getUserToken}`
                    },
                });
                
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversations();
    }, []);

    return { loading, conversations };

}

export default useGetConversations;