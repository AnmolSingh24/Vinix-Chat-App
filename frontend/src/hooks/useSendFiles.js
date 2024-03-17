import { useState } from "react";
import useConversations from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendFiles = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages, selectedConversation } = useConversations();

    const sendFiles = async (file) => {
        const sendFilesToken = document.cookie.split("=")[1];
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("message", "")
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sendFilesToken}`
                },
                body: formData
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages(prevMessages => [...prevMessages, data]);
        } catch (error) {
            console.error("Error uploading file:", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendFiles, loading };
}

export default useSendFiles;