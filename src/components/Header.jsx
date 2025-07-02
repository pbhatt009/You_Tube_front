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
import { useState } from 'react';
import RightSidebar from './RightSidebar.jsx';

import { changequery } from '../Store/query.jsx';
export default function Header() {
  const dispatch=useDispatch()
  const[showsearch,setsearch]=useState(false);
  const changesearch=(e)=>{
     e.preventDefault();
    setsearch(prev=>!prev)
  }
  const searchmini=(e)=>{
    e.preventDefault();
    changesearch(e)
    searchhandel(e)

  }
  const searchhandel=(e)=>{
    e.preventDefault();
    console.log(e.target[0].value)
    dispatch(changequery(e.target[0].value))

  }
  const[showrightsidebar,setrightsidebar]=useState(false)
  const rsbarfn=()=>{
       setrightsidebar(prev=>!prev)
  }
 
  const userdata = useSelector((state) => state.auth.userdata);
  console.log("user",userdata.avatar);
    return(
        <header >
          <nav className=" flex sticky hinset-x-0 top-0 z-50 w-[100vw] h-[10vh] sm:h-[12vh] lg:h-[11vh] border-b border-white bg-[#121212] px-4 color-white text-amber-50  items-center py-2">
            <div hidden={showsearch} className="mr-4 w-12 shrink-0 sm:w-16">logo</div>
            <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
              <form onSubmit={searchhandel} >
              <input
              type='search'
                className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
                placeholder="Search"
                name='search'
              />
              </form>
              <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
                <MagnifyingGlassIcon className=" h-4 w-4" />
              </span>

            </div>
            <button onClick={rsbarfn} className=' hidden sm:block'>
              <img src={userdata.avatar} alt="no proflile" className='h-13 w-12 rounded-full' />
            </button>

            {/* //small screem */}
            <div className=" w-full gap-3 flex sm:hidden items-end justify-end">
            
            <form hidden={!showsearch} className='w-full' onSubmit={searchmini} >
                <input
              type='search'
                className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
                placeholder="Search"
                name='search'
              />
            
              </form>
             <button hidden={showsearch} className="ml-auto" onClick={changesearch}>
              <MagnifyingGlassIcon className=" h-6 w-6" />
            </button>
                 
            <button hidden={showsearch} onClick={rsbarfn} className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
              <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
              <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
              <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
            </button>
            </div>
          </nav>
          <div >
          <RightSidebar show={showrightsidebar} changeshow={rsbarfn}/>
          </div>
        </header>
    )
}
    