'use client'

import { useChat } from 'ai/react';

const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-[350px] max-w-[350px] flex flex-col bg-black">
      <div className="flex-grow overflow-auto">
        {messages.map((m) => (
          <div key={m.id} className="bg-white p-2 my-2 mx-4 rounded shadow">
            {m.content}
          </div>
        ))}
      </div>
      <div className="mb-4 mx-4">
        <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="border p-2 w-full rounded"
          placeholder="Type your message here"
        />
        {/* <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-2 shadow"
        >
          Send
        </button> */}

        </form>

      </div>
    </div>
  );
};

export default Chat;
