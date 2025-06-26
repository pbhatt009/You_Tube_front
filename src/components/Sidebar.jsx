import React from 'react';
import { Link } from 'react-router-dom';
import {HomeIcon,VideoCameraIcon, ClockIcon,BellIcon} from '@heroicons/react/24/solid';

const navItems = [
  { name: 'Home', to: '/', icon: <HomeIcon className="h-5 w-5" /> },
  {name:'My Videos', to: '/my-videos', icon: <VideoCameraIcon className="h-5 w-5" /> },

  { name: 'Subscriptions', to: '/subscriptions', icon: <BellIcon className="h-5 w-5" /> },
 
  { name: 'History', to: '/history', icon: <ClockIcon className="h-5 w-5" /> },
];

const Sidebar = () => {
  return (
    <div className="left-0 w-[19vw] lg:w-[15vw] xl:w-[11vw] h-full bg-black text-white  hidden sm:block">
      
      <nav>
        <div className='flex flex-col  relative'>
          {navItems.map((item) => (
    
  <div key={item.name} className=" h-17  w-full  border-b border-gray-400 flex justify-center ">
    <Link
      to={item.to}
      className="flex items-center h-full w-full space-x-3 p-2 rounded-lg hover:bg-gray-700  justify-center"
    >
      {item.icon}
      <span>{item.name}</span>
    </Link>
  </div>
))
        }
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
