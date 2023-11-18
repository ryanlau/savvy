'use client'
import React from 'react';
import TopBar from '@/savvy-components/TopBar';
import LeftSidebar from '@/savvy-components/body/LeftSideBar';
import Recommendations from '@/savvy-components/body/Recommendations';
import RightSidebar from '@/savvy-components/body/RightSideBar';

const App = () => {
  return (
    <div className="h-screen flex flex-col w-full">
      <TopBar />
      <div className="grow flex justify-between">
          <LeftSidebar/>
          <Recommendations />
          <RightSidebar />
      </div>
    </div>
  );
};

export default App;
