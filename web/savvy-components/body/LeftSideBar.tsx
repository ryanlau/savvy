"use client";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

// import React, { useState } from 'react';
// import { Transition } from '@headlessui/react';
// import { Button } from '@/components/ui/button';

// export default function LeftSidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Icons (can be replaced with icons from an icon library)
//   const openIcon = '≡';
//   const closeIcon = '×';

//   return (
//     <div className="relative flex">
//       <Transition
//         show={isOpen}
//         enter="transition ease-out duration-300"
//         enterFrom="-translate-x-full"
//         enterTo="translate-x-0"
//         leave="transition ease-in duration-300"
//         leaveFrom="translate-x-0"
//         leaveTo="-translate-x-full"
//       >
//         <aside className="w-64 h-screen bg-black text-white">
//           {/* Sidebar content */}
//           <Button>
//             Load Shopping Trips
//           </Button>
//           <button
//             className="absolute top-0 right-0 px-2 text-white bg-red-500 rounded-full focus:outline-none focus:ring shadow-lg"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {closeIcon}
//           </button>
//         </aside>
//       </Transition>
//       {!isOpen && (
//         <button
//           className="absolute top-0 left-0 px-2 text-white bg-gray-500 rounded-full focus:outline-none focus:ring shadow-lg"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {openIcon}
//         </button>
//       )}
//     </div>
//   );
// };

export default function LeftSidebar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  return (
    // <div className="w-[350px] max-w-[350px] bg-gray-100 flex shrink-0 justify-center items-center">
    <div className="w-[350px] max-w-[350px] bg-gray-100">
      <div className="p-5">
        <h1 className="text-2xl mb-5">History</h1>
        <div className="flex flex-col space-y-3">
        <div>
          <div>{query}</div>
          <Separator className="bg-black" />
        </div>
        <div>
          <div>sleeping bags</div>
          <Separator className="bg-gray-300"/>
        </div>
        <div>
          <div>headphones for kids</div>
          <Separator className="bg-gray-300"/>
        </div>
        <div>
          <div>
            I'm really wondering what's the best soda. It has to be green though
          </div>
          <Separator className="bg-gray-300"/>
        </div>
        <div>
          <div>Water jugs that come with a filter</div>
          <Separator className="bg-gray-300"/>
        </div>

        </div>
        
      </div>
    </div>
  );
}
