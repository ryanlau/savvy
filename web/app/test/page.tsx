'use client'
import React from 'react';
import TopBar from '@/savvy-components/TopBar';
import LeftSidebar from '@/savvy-components/body/LeftSideBar';
import Recommendations from '@/savvy-components/body/Recommendations';
import RightSidebar from '@/savvy-components/body/RightSideBar';

const App = () => {
  return (
    <div className="justify-end items-stretch flex flex-col">
      <TopBar />
      <div className="w-full max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <LeftSidebar/>
          <div className='flex w-full'>

          
            <Recommendations />
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
