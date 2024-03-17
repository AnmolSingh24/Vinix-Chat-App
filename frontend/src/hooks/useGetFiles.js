import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useGetFiles = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getFiles = async () => {
      const getFilesToken = document.cookie.split("=")[1];
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getFilesToken}`
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
    if (selectedConversation?._id) getFiles();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading }

}

export default useGetFiles;