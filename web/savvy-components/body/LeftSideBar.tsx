'use client'

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
  return (
    <div className="w-[350px] max-w-[350px] bg-gray-100 flex shrink-0 justify-center items-center">
      <p>Your shopping trips will be saved here</p>
    </div>
  );
}
