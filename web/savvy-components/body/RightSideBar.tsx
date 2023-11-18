import React, { useState } from 'react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "hello how can i help" },
    { id: 2, text: "yes umm under 500 pls thx" },
    { id: 3, text: "ok np here you go" },
    // ... other initial messages
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const nextMessages = [...messages, { id: messages.length + 1, text: newMessage }];
      setMessages(nextMessages);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-1/3 h-screen flex flex-col bg-black">
      <div className="flex-grow overflow-auto">
        {messages.map((message) => (
          <div key={message.id} className="bg-white p-2 my-2 mx-4 rounded shadow">
            {message.text}
          </div>
        ))}
      </div>
      <div className="mb-4 mx-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Type your message here"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="w-full bg-blue-500 text-white p-2 rounded mt-2 shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
