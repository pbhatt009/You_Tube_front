import { Link } from 'react-router-dom';
import {
  EyeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import RightSidebar from './RightSidebar.jsx';

import { changequery } from '../Store/query.jsx';
export default function Header() {
  const dispatch=useDispatch()
  const[showsearch,setsearch]=useState(false);
  const[showrightsidebar,setrightsidebar]=useState(false)
  const sidebarRef = useRef(null);

  
  // Click outside to close right sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showrightsidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setrightsidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showrightsidebar]);

  const changesearch=(e)=>{
     e.preventDefault();
    setsearch(prev=>!prev)
  }
  
  const closeSearch = () => {
    setsearch(false);
  }
  
  const searchmini=(e)=>{
    e.preventDefault();
    changesearch(e)
    searchhandel(e)

  }
  const searchhandel=(e)=>{
    e.preventDefault();
    //  console.log("hiiii",e.target[0].value)
    dispatch(changequery(e.target[0].value||""))

  }
  
  const rsbarfn=()=>{
       setrightsidebar(prev=>!prev)
  }
 
  const userdata = useSelector((state) => state.auth.userdata);
  const isAuthenticated = useSelector((state) => state.auth.status);
  
  // Fallback values for guest users
  const userAvatar = userdata?.avatar ;
  const userName = userdata?.username || "Guest";
  const userFullName = userdata?.fullName || "Guest User";

    return(
        <header >
          <nav className="flex sticky hinset-x-0 top-0 z-50 w-[100vw] h-[10vh] sm:h-[12vh] lg:h-[11vh] border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-md px-4 color-white text-white items-center py-2 shadow-lg">
            <div hidden={showsearch} className="mr-4 w-12 shrink-0 sm:w-16 flex items-center">
              <Link to="/" className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-xl px-3 py-1 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 cursor-pointer">
                YT
              </Link>
            </div>
            <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
              <form onSubmit={searchhandel} >
              <input
              type='search'
                className="w-full border border-gray-600 rounded-full bg-gray-800/50 py-2 pl-10 pr-4 placeholder-gray-400 outline-none focus:border-red-500 focus:bg-gray-800 transition-all duration-200 text-white"
                placeholder="Search videos..."
                name='search'
              />
              </form>
              <span className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </span>

            </div>
            
            {/* Guest User Buttons */}
            {!isAuthenticated && (
              <div className="hidden sm:flex items-center gap-3">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-white hover:text-red-400 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Register
                </Link>
              </div>
            )}
            
            {/* Authenticated User Avatar - Show on all screen sizes */}
            {isAuthenticated && (
              <button onClick={rsbarfn} className='hover:scale-105 transition-transform duration-200'>
                <img src={userAvatar} alt={`${userName}'s Profile`} className='hidden sm:block h-10 w-10 rounded-full border-2 border-gray-600 hover:border-red-500 transition-colors duration-200' />
              </button>
            )}

            {/* //small screem */}
            <div className=" w-full gap-3 flex sm:hidden items-end justify-end">
            
            <form hidden={!showsearch} className='w-full relative' onSubmit={searchmini} >
                <input
              type='search'
                className="w-full border border-gray-600 rounded-full bg-gray-800/50 py-2 pl-10 pr-12 placeholder-gray-400 outline-none focus:border-red-500 text-white"
                placeholder="Search videos..."
                name='search'
              />
              <span className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </span>
              <button 
                type="button"
                onClick={closeSearch}
                className="absolute right-3 top-1/2 inline-block -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </form>
             <button hidden={showsearch} className="ml-auto p-2 rounded-full hover:bg-gray-800 transition-colors duration-200" onClick={changesearch}>
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            
            {/* Mobile Guest Buttons */}
            {!isAuthenticated && !showsearch && (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login"
                  className="px-3 py-1.5 text-white hover:text-red-400 transition-colors duration-200 text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
                 
           {isAuthenticated?<button hidden={showsearch} onClick={rsbarfn} className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
              <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
              <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
              <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
            </button>:null}
            </div>
          </nav>
          <div ref={sidebarRef}>
          <RightSidebar show={showrightsidebar} changeshow={rsbarfn}/>
          </div>
        </header>
    )
}
    