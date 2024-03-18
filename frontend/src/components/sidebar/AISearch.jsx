import { useState, useRef } from 'react';
import { SiChatbot } from "react-icons/si";

export const AISearch = () => {
  const [messages, setMessages] = useState([
    { content: "Hi there 👋\nHow can I help you today?", sender: "incoming" }
  ]);
  const chatInputRef = useRef(null);
  const API_KEY = "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";

  const handleChat = () => {
    const userMessage = chatInputRef.current.value.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { content: userMessage, sender: "incoming" }];
    setMessages(newMessages);
    chatInputRef.current.value = '';

    setTimeout(() => {
      setMessages([...newMessages, { content: "Thinking...", sender: "incoming" }]);
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
      .then(res => res.json())
      .then(data => {
        const response = data.choices[0].message.content.trim();
        setMessages([...messages, { content: response, sender: "incoming" }]);
      })
      .catch(() => {
        setMessages([...messages, { content: "Oops! Something went wrong. Please try again.", sender: "incoming" }]);
      });
  };

  return (
    <div className="relative">
      <button type='submit' className='btn btn-circle border-none bg-emerald-500 text-white'>
        <SiChatbot className="chatbot-toggler h-6 w-6 flex items-center justify-center rounded-fullcursor-pointer" onClick={() => document.body.classList.toggle("show-chatbot")} />
      </button>

      <div className="chatbot absolute w-96 h-fit bg-white rounded-lg overflow-hidden transform scale-100 transition-all duration-100 ease-in-out">
        <header className="bg-emerald-600 text-white py-4 text-center relative">
          <h2 className="text-lg font-semibold">VINIX AI </h2>
          <span className="close-btn material-symbols-outlined absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={() => document.body.classList.remove("show-chatbot")}>X</span>
        </header>
        <ul className="chatbox overflow-y-auto max-h-96 p-6">
          {messages.map((message, index) => (
            <li key={index} className={`chat ${message.sender}`}>
              {message.sender === "incoming" && <span className="material-symbols-outlined w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-md text-white mr-2">smart_toy</span>}
              <p className={`p-2 rounded-2xl max-w-3/4 ${message.sender === "incoming" ? "bg-gray-200 text-black" : "bg-emerald-600 text-white"}`}>{message.content}</p>
            </li>
          ))}
        </ul>
        <div className="chat-input flex items-center border border-gray-600 text-black bg-white">
          <textarea ref={chatInputRef} className="flex-1 border-none outline-none resize-none bg-white pl-2" placeholder="Enter a message..." spellCheck="true" required></textarea>
          <span id="send-btn" className="material-symbols-rounded text-emerald-600 text-xl flex items-center justify-center cursor-pointer mr-6" onClick={handleChat}>send</span>
        </div>
      </div>
    </div>
  );
}