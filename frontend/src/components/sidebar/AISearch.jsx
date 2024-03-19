import { useState, useRef } from 'react';
import { SiChatbot } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";

export const AISearch = () => {
  const [messages, setMessages] = useState([
    { content: "Hi there, \nHow can I help you today?", sender: "outgoing" }
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatInputRef = useRef(null);
  const API_KEY = "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";

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
      generateResponse(userMessage);
    }, 600);
  };

  const generateResponse = (userMessage) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      })
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error(error.message);
        }
        return res.json();
      })
      .then(data => {
        const response = data.choices[0].message.content.trim();
        setMessages(prevMessages => [
          ...prevMessages,
          { content: response, sender: "incoming" }
        ]);
      })
      .catch(error => {
        console.error('There was an error generating response:', error);
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          { content: "Oops! Something went wrong. Please try again.", sender: "outgoing" }
        ]);
      });
  };

  return (
    <div className="relative z-10">
      <button type='submit' className='btn btn-circle border-none bg-emerald-500 hover:bg-emerald-600 text-white'>
        <SiChatbot className="chatbot-toggler h-6 w-6 flex items-center justify-center rounded-fullcursor-pointer" onClick={() => setShowChatbot(!showChatbot)} />
      </button>

      {showChatbot && (
        <div className="chatbot absolute w-96 h-fit bg-white rounded-lg overflow-hidden transform scale-100 transition-all duration-100 ease-in-out">
          <header className="bg-emerald-600 text-white py-4 text-center relative">
            <h2 className="text-lg font-semibold">VINIX AI </h2>
            <span className="close-btn material-symbols-outlined absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowChatbot(false)}>X</span>
          </header>
          <ul className="max-h-96 p-6">
            {messages.map((message, index) => (
              <li key={index} className={`chat ${message.sender}`}>
                {message.sender === "incoming" && <span className="material-symbols-outlined w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-md text-white mr-2"><RiRobot2Line /></span>}
                <p className={`p-2 rounded-2xl max-w-3/4 ${message.sender === "incoming" ? "bg-emerald-500 text-white" : "bg-emerald-600 text-white"}`}>{message.content}</p>
              </li>
            ))}
          </ul>
          <div className="chat-input flex items-center border border-gray-600 text-black bg-white">
            <textarea ref={chatInputRef} className="flex-1 border-none outline-none resize-none bg-white pl-2" placeholder="Enter a message..." spellCheck="true" required></textarea>
            <span id="send-btn" className="material-symbols-rounded text-emerald-600 text-xl flex items-center justify-center cursor-pointer mr-6" onClick={handleChat}>send</span>
          </div>
        </div>
      )}
    </div>
  );
}