import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      const getMessageToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU4MTA4NGE4OTVjMjljZGIwMWYyYmIiLCJpYXQiOjE3MTAyNjExOTcsImV4cCI6MTcyMDYyOTE5N30._cyYdUTtZFCjtQYxs3Une1b8bNF2rD8lPTSWjONl5_k";
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