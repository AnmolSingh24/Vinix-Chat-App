// import { useState } from "react"
// import useConversations from "../zustand/useConversation.js";
// import toast from "react-hot-toast";

// const useSendMessage = () => {

//     const [loading, setLoading] = useState(false);
//     const { messages, setMessages, selectedConversation } = useConversations();

//     function getBase64(file) {
//         if (!file) return;
//         return new Promise(function (resolve, reject) {
//             var reader = new FileReader();
//             console.log(file);
//             reader.readAsDataURL(file);
//             reader.onload = function () {
//                 resolve(reader.result);
//             };
//             reader.onerror = function (error) {
//                 reject(error);
//             };
//         });
//     }

//     const sendMessage = async (message, file, audio) => {
//         const sendMessageToken = document.cookie.split("=")[1];
//         setLoading(true);
//         const sendAudioFile = await getBase64(audio);
//         const userSendFile = await getBase64(file);
//         try {
//             const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${sendMessageToken}`
//                 },
//                 body: JSON.stringify({ message, userSendFile, sendAudioFile }),
//             });

//             const data = await res.json();
//             if (data.error) throw new Error(data.error);
//             setMessages([...messages, data]);

//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { sendMessage, loading };
// }

// export default useSendMessage;



import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    function getBase64(file) {
        if (!file) return Promise.resolve(null);
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    }

    const sendMessage = async (message, file, audio) => {
        const sendMessageToken = document.cookie.split("=")[1];

        // Check if a conversation is selected
        if (!selectedConversation) {
            toast.error("No conversation selected");
            return;
        }

        setLoading(true);

        try {
            let userSendFile = null;
            let sendAudioFile = null;

            if (file instanceof File) {
                userSendFile = await getBase64(file);
            } else if (audio instanceof File) {
                sendAudioFile = await getBase64(audio);
            }

            const body = { message };

            if (userSendFile) {
                body.userSendFile = userSendFile;
            }else if (sendAudioFile) {
                body.sendAudioFile = sendAudioFile;
            }

            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sendMessageToken}`
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;