import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useRef } from 'react';
import { SiChatbot } from "react-icons/si";
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

    const newMessages = [...messages, { content: userMessage, sender: "outgoing" }];
    chatInputRef.current.value = '';

    setMessages(prevMessages => [
      ...prevMessages,
      { content: userMessage, sender: "incoming" }
    ]);

    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { content: "Thinking...", sender: "outgoing" }
      ]);
      Api(userMessage);

    }, 600);
  };

  async function Api(userMessage) {
    const API_KEY = 'AIzaSyBBWHq1VljK2JvAtvYyL-l_0OWzShowlEE';

    const genAI = new GoogleGenerativeAI(API_KEY);
    if (!userMessage || userMessage.length === 0) return;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const res = await model.generateContent(userMessage);

      const response = await res.response.text();
      setMessages(prevMessages => [
        ...prevMessages,
        { content: response, sender: "outgoing" }
      ]);

    } catch (error) {
      console.error("An error occurred:", error);
      setMessages(prevMessages => [
        ...prevMessages.slice(0, -1),
        { content: "Oops! Something went wrong. Please try again.", sender: "outgoing" }
      ]);
    }
  }

  return (
    <div className="relative z-10">
      <button type='submit' className='btn btn-circle border-none bg-emerald-500 hover:bg-emerald-600 text-white' onClick={() => setShowChatbot(!showChatbot)}>
        <SiChatbot className="chatbot-toggler h-6 w-6 flex items-center justify-center rounded-fullcursor-pointer" />
      </button>

      {showChatbot && (
        <div className="chatbot -top-5 left-[4rem] absolute w-[29rem] h-[35rem] bg-white rounded-lg overflow-hidden transform scale-100 transition-all duration-100 ease-in-out">
          <header className="bg-emerald-600 text-white py-4 text-center relative">
            <h2 className="text-lg font-semibold">VINIX AI </h2>
            <span className="close-btn material-symbols-outlined absolute top-1/2 right-8 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowChatbot(false)}>x</span>
          </header>

          <ul className="h-[28rem] p-6 overflow-auto">
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
            <span id="send-btn" className="material-symbols-rounded text-emerald-600 text-xl flex items-center justify-center cursor-pointer mr-6" onClick={handleChat}>send</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AISearch;