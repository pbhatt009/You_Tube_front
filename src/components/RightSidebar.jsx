import { XCircleIcon,TvIcon,Cog6ToothIcon,PlusIcon,LockClosedIcon} from "@heroicons/react/24/outline"
import { useState,useEffect, useCallback } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link ,useNavigate} from "react-router-dom"
import { logoutreq } from "../utils/index.js"
import { logout } from "../Store/Auth_reducer.jsx"
import { getchanneldetails } from "../utils/index.js"

export default function RightSidebar({show ,changeshow}){
const userdata=useSelector(state=>(state.auth.userdata))
const isAuthenticated = useSelector((state) => state.auth.status);
const dispatch=useDispatch()
const[error,seterror]=useState("")
const userdeatils=useSelector(state=>state.auth.userdata);
const navigate=useNavigate()

// Fallback values for guest users
const userAvatar = userdata?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face";
const userName = userdata?.username || "Guest";
const userFullName = userdata?.fullName || "Guest User";

const navItems = [
  
  {name:'My Channel', to: '/dashboard', icon:<TvIcon id='/dashboard' className="h-4 w-4"/> },
 
     {name:'Edit-channel', to: '/edit-channel', icon:<Cog6ToothIcon id="/edit-channel"  className="h-4 w-4"/> },
    { name:'Upload-Video',to: '/uploadVideo',icon:<PlusIcon id= '/uploadVideo' className="h-4 w-4"/>},
      { name:'Change Password',to: '/changepassword',icon:<LockClosedIcon id= '/changepassword' className="h-4 w-4"/>}
 
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
     const result=await getchanneldetails(userName)
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
<div hidden={!show} className="h-screen w-[70vw] lg:w-[20vw] sm:w-[40vw] md:w-[30vw] bg-black border-amber-50 text-white fixed top-0 z-200 right-0 flex flex-col">
 {/* Close Button */}
 <div className="flex justify-end p-4">
   <button onClick={changeshow} className="hover:bg-gray-800 rounded-full p-1 transition-colors duration-200">
     <XCircleIcon className="h-8 w-8"/>
   </button>
 </div>

 {/* User Profile Section */}
 <div className="flex flex-col items-center px-4 py-6">
   <img src={userAvatar} className="h-20 w-20 rounded-full border-2 border-white shadow-lg mb-3" alt={`${userName}'s Profile`} />
   <span className="text-lg font-medium">{userFullName}</span>
 </div>

 {/* Navigation Items */}
 <div className="flex-1 flex flex-col px-4">
   <div className="flex flex-col gap-1">
     {navItems.map(item => (
       <div key={item.name} className="border-t border-gray-700">
         <button
           id={item.to}
           className="w-full items-center space-x-3 p-4 rounded-lg hover:bg-gray-800 flex justify-start transition-colors duration-200"
           onClick={handel}
         >
           {item.icon}
           <span id={item.to}>{item.name}</span>
         </button>
       </div>
     ))}
   </div>
 </div>

 {/* Logout Section - Only show for authenticated users */}
 {isAuthenticated && (
   <div className="p-4 border-t border-gray-700">
     <button
       onClick={handleLogout}
       className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition duration-200"
     >
       Log Out
     </button>
     
     {/* Error Message */}
     {error && (
       <div className="mt-3 text-center">
         <span className="text-red-400 text-sm">{error}</span>
       </div>
     )}
   </div>
 )}
</div>
)

} 

