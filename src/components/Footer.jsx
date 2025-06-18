import React from 'react';
import { Link } from 'react-router-dom';
import {HomeIcon,VideoCameraIcon, ClockIcon,BellIcon} from '@heroicons/react/24/solid';

const navItems = [
  { name: 'Home', to: '/', icon: <HomeIcon className="h-5 w-5" /> },
  {name:'My Videos', to: '/my-videos', icon: <VideoCameraIcon className="h-5 w-5" /> },

  { name: 'Subscriptions', to: '/subscriptions', icon: <BellIcon className="h-5 w-5" /> },

  { name: 'History', to: '/history', icon: <ClockIcon className="h-5 w-5" /> },
];

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-15 bg-black text-white  sm:hidden opacity-85 text-xs">


        <div className='flex flex-row  justify-evenly relative'>
          {navItems.map((item) => (
            <div key={item.name} className="mb-4 flex flex-col">
              <Link
                to={item.to}
                className=" items-center  p-2 rounded-lg hover:bg-gray-700 flex flex-col"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default Footer;
