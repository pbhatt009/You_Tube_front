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
    <div className="left-0 w-[19vw] lg:w-[15vw] xl:w-[11vw] h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white hidden sm:block border-r border-gray-700/50">
      
      <nav className="h-full">
        <div className='flex flex-col h-full pt-4'>
          {navItems.map((item) => (
    
  <div key={item.name} className="px-2 mb-2">
    <Link
      to={item.to}
      className="flex items-center w-full space-x-3 p-3 rounded-xl hover:bg-gray-700/50 transition-all duration-200 group hover:scale-105 justify-center lg:justify-start"
    >
      <div className="text-gray-300 group-hover:text-red-400 transition-colors duration-200">
        {item.icon}
      </div>
      <span className="hidden lg:block text-sm font-medium group-hover:text-white transition-colors duration-200">{item.name}</span>
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
