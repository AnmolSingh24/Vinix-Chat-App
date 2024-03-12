import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            const getUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU4MTA4NGE4OTVjMjljZGIwMWYyYmIiLCJpYXQiOjE3MTAyNjExOTcsImV4cCI6MTcyMDYyOTE5N30._cyYdUTtZFCjtQYxs3Une1b8bNF2rD8lPTSWjONl5_k";
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