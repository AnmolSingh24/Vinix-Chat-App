import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      const getMessageToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxY2ZhZjQwOGIwZjFiZDJlMmE2MDQiLCJpYXQiOjE3MDkyOTc1ODMsImV4cCI6MTcxOTY2NTU4M30.Jw5_CRDsTk9hHA9whD7joidLGHl5PumzrsYPYMwcnSE";
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getMessageToken}`
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