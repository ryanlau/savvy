'use client'

import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatProps {
  messages: any;
  input: string;
  handleInputChange: any;
  handleSubmit: any;
  isLoading: boolean;
}

export default function Chat(props:ChatProps) {
  
  return (
    <div className="w-[350px] max-w-[350px] flex shrink-0 flex-col bg-gray-100">
      <div className="flex-grow h-[100px] min-h-0 overflow-y-auto p-4">
        {props.messages.map((m: {id: string, content: string, role: string}, index: number) => (
          <div className={`flex content-center ${m.role == "user" ? "justify-start" : "justify-end"}`}>
          {m.role == "user" &&
          <div className="py-2">

              <Avatar>
                <AvatarImage src="/avata.png" />
                <AvatarFallback className="text-black text-xs">YOU</AvatarFallback>
              </Avatar>
              </div>
          }
          
          <div key={m.id} className={`${m.role == "user" ? "bg-blue-500 text-white": "bg-white"} p-2 my-2 mx-4 rounded shadow`}>
            

            
            
            {m.role == "user" ? m.content : 
              props.isLoading && (index == props.messages.length - 1) ?
              <div>
                <p>Processing your request...</p>
                <div>
                  <Progress value={(m.content.length * 100) / 6000 }/>
                </div>
              </div> : <p>Completed your request</p>
            }
          </div>
          {m.role != "user" &&
          <div className="py-2">

              <Avatar>
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="text-black text-xs">YOU</AvatarFallback>
              </Avatar>
              </div>
          }
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

