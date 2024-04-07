import { useEffect, useState } from "react"
import { useConversation } from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      const storedToken = document.cookie.split("=")[1];
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}/conversation/${selectedConversation.conversation}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`
          },
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);

      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false);
      }
    }
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading }

}

export default useGetMessages;