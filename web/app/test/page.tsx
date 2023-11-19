'use client'
import React from 'react';
import TopBar from '@/savvy-components/TopBar';
import LeftSidebar from '@/savvy-components/body/LeftSideBar';
import Recommendations from '@/savvy-components/body/Recommendations';
import RightSidebar from '@/savvy-components/body/RightSideBar';

import { useChat } from 'ai/react';

const App = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({onError: (e) => console.log(e), onFinish: (e) => console.log('doe')});

  const assistantMessages = messages.filter(m =>  m.role == "assistant")



  let recommendations: any = []

  if (assistantMessages.length == 0) {
    recommendations = []
  } else {
    let lastMessage = assistantMessages.at(-1)!.content;
    lastMessage = lastMessage.substring(0, lastMessage.lastIndexOf("}") + 1)
    lastMessage += "]"

    if (lastMessage ==  "]") {
      recommendations = []
    } else {
      console.log(lastMessage)
      recommendations = JSON.parse(lastMessage)
    }
  }

  console.log(recommendations);

  return (
    <div className="h-screen max-h-screen flex flex-col w-full">
      <TopBar />
      <div className="grow flex justify-between">
          <LeftSidebar/>
          <Recommendations recommendations={recommendations} />
          <RightSidebar messages={messages} input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;
