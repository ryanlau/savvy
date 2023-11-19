'use client'
import React, { useState, useEffect, useRef } from 'react';
import TopBar from '@/savvy-components/TopBar';
import LeftSidebar from '@/savvy-components/body/LeftSideBar';
import Recommendations from '@/savvy-components/body/Recommendations';
import RightSidebar from '@/savvy-components/body/RightSideBar';

import { useChat } from 'ai/react';
import { useSearchParams } from 'next/navigation';
import { set } from 'react-hook-form';

export default function App() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const lockRef = useRef(false);
  const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat({
    onError: (e) => console.log(e),
    onFinish: (e) => console.log('done')
  });

  const assistantMessages = messages.filter(m => m.role == "assistant");

  useEffect(() => {
    if (lockRef.current) return;
    console.log(lockRef.current);
    if (query) {
      lockRef.current = true;
      append({ id: "asdfasf", content: query, role: "user" });
    }
  }, [query]);
  

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
      //console.log(lastMessage)
      recommendations = JSON.parse(lastMessage)
    }
  }

  //console.log(recommendations);

  return (
    <div className="h-screen max-h-screen flex flex-col w-full">
      <TopBar />
      <div className="grow flex justify-between">
          <LeftSidebar/>
          <Recommendations recommendations={recommendations} />
          <RightSidebar messages={messages} input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isLoading={isLoading}/>
      </div>
    </div>
  );
};

