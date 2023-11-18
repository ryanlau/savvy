'use client'

import React from 'react';

interface PageProps {
  // Define the props for your component here
}

import { useSearchParams } from 'next/navigation'

const Page: React.FC<PageProps> = () => {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('q')

  // Use the 'q' variable to access the value of the 'q' query parameter

  return (
    <div>
      {search}
    </div>
  );
};

export default Page;
