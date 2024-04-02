import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useRef } from 'react';
import { RiChatSmile3Line } from "react-icons/ri";
import { RiRobot2Line } from "react-icons/ri";

const AISearch = () => {
  const [messages, setMessages] = useState([
    { content: "Hi there, \nHow can I assist you today?", sender: "outgoing" }
  ]);

  const [showChatbot, setShowChatbot] = useState(false);
  const chatInputRef = useRef(null);

  const handleChat = () => {
    const userMessage = chatInputRef.current.value.trim();
    if (!userMessage) return;

    addMessage({ content: userMessage, sender: "incoming" });

    setTimeout(() => {
      addMessage({ content: "Thinking...", sender: "outgoing" });
      processUserMessage(userMessage);
    }, 600);
  };

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const processUserMessage = async (userMessage) => {
    const API_KEY = 'AIzaSyBBWHq1VljK2JvAtvYyL-l_0OWzShowlEE';

    const genAI = new GoogleGenerativeAI(API_KEY);
    if (!userMessage || userMessage.length === 0) return;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const res = await model.generateContent(userMessage);
      const response = await res.response.text();
      console.log(response);
      addMessage({ content: response, sender: "outgoing" });
    } catch (error) {
      console.error("An error occurred:", error);
      addMessage({ content: "Oops! Something went wrong. Please try again.", sender: "outgoing" });
    }
  };

  return (
    <div className="relative z-10">

      <button type='submit' className="text-black p-1.5 flex items-center justify-center gap-2" onClick={() => setShowChatbot(!showChatbot)}>
        <RiChatSmile3Line className="w-6 h-6 text-black  ml-1" />
        Vinix Chatbot
      </button>

      {showChatbot && (
        <div className="chatbot -top-28 left-[11rem] absolute w-[29rem] h-[35rem] bg-white rounded-lg overflow-hidden transform scale-100 transition-all duration-100 ease-in-out">
          <header className="bg-emerald-600 text-white py-4 text-center relative">
            <h2 className="text-lg font-semibold pt-0.5">VINIX AI </h2>
            <span className="close-btn material-symbols-outlined absolute top-1/2 right-8 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowChatbot(false)}>x</span>
          </header>

          <ul className="h-[27.8rem] p-6 overflow-auto">
            {messages.map((message, index) => (
              <li key={index} className={`chat ${message.sender}`}>
                {message.sender === "incoming" && <span className="material-symbols-outlined w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-md text-white mr-2"><RiRobot2Line /></span>}
                <p className={`p-2 rounded-2xl max-w-96 ${message.sender === "incoming" ? "bg-emerald-500 text-white" : "bg-gray-200 text-black"}`}>{message.content}</p>
              </li>
            ))}
          </ul>
          <div className="flex items-center border-t border-gray-400 text-black bg-white">
            <input ref={chatInputRef}
              type="text"
              className='text-sm rounded-lg block w-full p-2.5  outline-none bg-white text-black'
              placeholder="Enter a message..."
              spellCheck="true"
            />
            <span id="send-btn" className="bg-emerald-600 text-white text-lg flex items-center justify-center cursor-pointer py-1.5 px-3 rounded-full mt-1 mr-6" onClick={handleChat}>Send</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AISearch;