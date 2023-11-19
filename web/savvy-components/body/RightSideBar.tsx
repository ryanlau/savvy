'use client'

interface ChatProps {
  messages: any;
  input: string;
  handleInputChange: any;
  handleSubmit: any;
}

export default function Chat(props:ChatProps) {

  return (
    <div className="w-[350px] max-w-[350px] flex shrink-0 flex-col bg-gray-100">
      <div className="flex-grow h-[100px] min-h-0 overflow-y-auto">
        {props.messages.map((m: {id: string, content: string, role: string}) => (
          <div key={m.id} className={`${m.role == "user" ? "bg-blue-500 text-white": "bg-white"} p-2 my-2 mx-4 rounded shadow`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="mb-4 mx-4">
        <form onSubmit={props.handleSubmit}>

        <input
          type="text"
          value={props.input}
          onChange={props.handleInputChange}
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

