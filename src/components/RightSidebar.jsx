import { XCircleIcon,TvIcon,Cog6ToothIcon,PlusIcon} from "@heroicons/react/24/outline"
import { useState,useEffect, useCallback } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link ,useNavigate} from "react-router-dom"
import { logoutreq } from "../utils/index.js"
import { logout } from "../Store/Auth_reducer.jsx"
import { getchanneldetails } from "../utils/index.js"

export default function RightSidebar({show ,changeshow}){
const userdata=useSelector(state=>(state.auth.userdata))
const dispatch=useDispatch()
const[error,seterror]=useState("")
const userdeatils=useSelector(state=>state.auth.userdata);
const navigate=useNavigate()


const navItems = [
  
  {name:'My Channel', to: '/dashboard', icon:<TvIcon id='/dashboard' className="h-4 w-4"/> },
 
     {name:'edit-channel', to: '/edit-channel', icon:<Cog6ToothIcon id="/edit-channel"  className="h-4 w-4"/> },
    { name:'Upload-Video',to: '/uploadVideo',icon:<PlusIcon id= '/uploadVideo' className="h-4 w-4"/>}
 
 
];


const handleLogout=async (e)=>{
     e.preventDefault();
   const result=await(logoutreq())
   if(result.error){
      seterror(result.error.message)
      return;
   }
      console.log('hh')
    dispatch(logout())
    navigate('/login', { replace: true });
   
   

}

const handel=async (e)=>{
  
  let channel={};
  console.log(e.target.id)
  if(e.target.id=="/dashboard"){
     const result=await getchanneldetails(userdata.username)
        if(result.error){
          seterror(result.error.message)
          return;
        }
        channel=result.data.data;
        // console.log("i am ere",channel[0])
         navigate('/dashboard', { state:{ channel:channel[0]}});
  }
  else if(e.target.id=='/edit-channel'){
    // console.log(userdeatils)
    navigate('/edit-channel', { state:{channelData:userdeatils}});
  }
  else{
     navigate(e.target.id)
  }
  changeshow()

}
   return (
<div hidden={!show} className="h-screen w-[70vw] lg:w-[20vw] sm:w-[40vw] md:w-[30vw] bg-black border-amber-50 text-white fixed top-0 z-100 right-0  ">
 <button onClick={changeshow}>
<XCircleIcon className=" h-10 w-10 absolute right-5"/>
 </button>

<button className="flex flex-col w-full justify-center items-center absolute top-20">
    <img src={userdata.avatar} className="h-20 w-20 rounded-full border-white shadow-amber-50" alt="no image" />
    <span>{userdata.fullName}</span>

</button>
<div className="flex flex-col justify-center items-center  gap-0 w-full absolute top-60 sm:top-50 text-white">

 {navItems.map(item => (
  <div key={item.name} className=" h-17  w-full border-t border-b  border-gray-400 flex justify-center ">
    <buttton
      id={item.to}
      className=" items-center h-full w-full space-x-3 p-2 rounded-lg hover:bg-gray-700 flex justify-center"
       onClick={handel}
       
    >
      {item.icon}
      <span id={item.to}>{item.name}</span>
    </buttton>
  </div>
))
        }
</div>

<div className='absolute bottom-17 md:bottom-13 lg:bottom-15  xl:bottom-27 w-full flex justify-center'>
<button
  onClick={handleLogout}
  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 "
>
  Log Out
</button>


</div>
<div className="absolute flex w-full bottom-15 justify-center">
 {error && <span className="text-red-500 text-m relative -top-3">{error}</span>}
</div>

</div>







)

} 

