import { useState } from "react"
import useConversations from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversations();

    function getBase64(file) {
        if (!file) return;
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result); // Resolve the Promise with the result
            };
            reader.onerror = function (error) {
                reject(error); // Reject the Promise with the error
            };
        });
    }

    const sendMessage = async (message, file) => {
        const sendMessageToken = document.cookie.split("=")[1];
        setLoading(true);
        const userSendFile = await getBase64(file);
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sendMessageToken}`
                },
                body: JSON.stringify({ message, userSendFile }),
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