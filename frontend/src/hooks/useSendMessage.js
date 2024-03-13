import { useState } from "react"
import useConversations from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversations();

    const sendMessage = async (message) => {
        const sendMessageToken = document.cookie.split("=")[1];
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sendMessageToken}`
                },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
}

export default useSendMessage;