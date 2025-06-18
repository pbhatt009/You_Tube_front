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
    <div className="fixed top-7 left-0 w-40 lg:w-55 h-full bg-black text-white p-2 hidden sm:block">
      
      <nav>
        <div className='flex flex-col space-y-2 relative top-10'>
          {navItems.map((item) => (
            <div key={item.name} className="mb-4 ">
              <Link
                to={item.to}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
