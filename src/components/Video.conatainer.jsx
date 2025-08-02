import React, { useState ,useEffect} from "react"
import { timeAgo } from "../utils"
import { useSelector } from "react-redux";
import { getchanneldetails } from "../utils/index.js";
import { replace, useNavigate } from "react-router-dom";
import { changestatus,deleteVideo,getVideoById } from "../utils/index.js";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
export default function VideoContainer({videodata,prev='/'}){
   const userdetails=useSelector(state=>state.auth.userdata);
     const[ismine,setismine]=useState(false);
       const[error,seterror]=useState("");
       const[ispublic,setpublic]=useState(videodata.isPublic)
     const navigate=useNavigate()
     const[showalert,setalert]=useState(false)
     const[sucess,setsucesss]=useState("")
    useEffect(() => {
    
  if (userdetails && videodata && userdetails._id === videodata.owner) {
    setismine(true);
  } else {
    setismine(false);
  }
}, [userdetails, videodata]);



const parentclick=async(e)=>{
  seterror("")
const result=await getVideoById(videodata._id);
if(result.error) {
      seterror(result.error.message)
      return;
    }
    // console.log(result.data.data)
    navigate('/videodashboard',{state:{video:result.data.data}})
}
const chaneldashboard=async(e)=>{
    e.stopPropagation();
    seterror("")
    const result=await getchanneldetails(videodata?.ownerinfo?.username);
    if(result.error) {
      seterror(result.error.message)
      return;
    }
    const chanel=result.data.data
    navigate('/dashboard', { state:{ channel:chanel[0]}});
}
const edit=(e)=>{
   e.stopPropagation();
   navigate('/updateVideo',{ state:{videoData:videodata}})

}
const[showOptions,setShowOptions]=useState(false)
const setchangestatus=async(e)=>{
  e.stopPropagation();
  const result=await changestatus(videodata._id)
  if(result.error) return;
  setpublic(prev=>!prev)
  setShowOptions(false)
  
}
const [deleteloading,setdeleteloading]=useState(false);
const delete_video=async(e)=>{
  seterror("");
  setsucesss("")
  setdeleteloading(true)
    e.stopPropagation();
const re=await deleteVideo(videodata._id)
if(re.error){
  seterror(re.error.message)
  setdeleteloading(false)
  return;

} 
setsucesss(re.data.message)

  setTimeout(() => {
      window.location.reload();
    }, 2000);
  

}
return(
<div className="box-border relative flex flex-col w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] rounded-xl bg-white hover:bg-gray-50 overflow-hidden transition-all duration-200 cursor-pointer group"
onClick={parentclick}>
  <div className="relative overflow-hidden rounded-xl">
    <img
      src={videodata.thumbnail}
      alt="No Thumbnail"
      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-200"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-200"></div>
    
    {/* Public/Private Badge on Thumbnail */}
    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
      {ispublic ? "Public" : "Private"}
    </div>
  </div>
   
   {/* Options Menu Button */}
   <div hidden={!ismine}
    onClick={(e)=>{
    e.stopPropagation()
    setShowOptions(prev=>!prev)}}
     className="bg-black/80 backdrop-blur-sm h-8 w-8 rounded-full absolute top-2 z-100 right-2 flex items-center justify-center hover:bg-black/90 transition-all duration-200">
    <EllipsisVerticalIcon className="h-4 w-4 text-white"/>
   </div>

   {/* Options Dropdown Menu */}
   <div hidden={!showOptions} className="flex flex-col absolute top-12 right-2 justify-center bg-white/95 backdrop-blur-sm text-gray-800 text-sm rounded-lg w-40 z-100 shadow-lg border border-gray-200">
     <button onClick={edit} className="px-3 py-2 hover:bg-gray-100 rounded-t-lg transition-colors duration-200 border-b border-gray-200 flex items-center gap-2">
       <PencilIcon className="h-4 w-4"/>
       Edit Video
     </button>
     <button onClick={setchangestatus} className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 flex items-center gap-2">
       {ispublic ? <EyeSlashIcon className="h-4 w-4"/> : <EyeIcon className="h-4 w-4"/>}
       {ispublic ? "Make Private" : "Make Public"}
     </button>
     <button 
      onClick={(e)=>{
    e.stopPropagation()
       setdeleteloading(false)
    setalert(prev=>!prev)
    setShowOptions(false)}}
     className="px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-b-lg transition-colors duration-200 flex items-center gap-2">
       <TrashIcon className="h-4 w-4"/>
       Delete Video
     </button>
   </div>

   {/* Delete Confirmation Alert */}
   <div hidden={!showalert} className="bg-black/80 backdrop-blur-sm gap-6 flex flex-col absolute h-[100%] justify-center items-center w-full z-101">
   {!deleteloading?(<div className="gap-6 flex flex-col absolute h-[100%] justify-center items-center w-full" > <p className="text-white text-base font-medium">Are you Sure?</p>
    <div className="flex gap-4">
      <button onClick={delete_video} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg transition-colors">Yes</button>
       <button 
    onClick={(e)=>{
    e.stopPropagation()
 
    setalert(prev=>!prev)}}
       className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 text-sm rounded-lg transition-colors">No</button>
    </div>
     <div className='flex justify-center items-center'>{error && <p className="text-red-400 text-sm">{error}</p>} </div>

   </div>):
  ( <div>
     {!sucess?
     <p className="text-white text-base"> Deleting the Video...  </p>:
    <div className='flex justify-center items-center'><p className="text-green-400 text-sm">{sucess}</p> </div>
     
     }
  </div>)
}
   </div>

   {/* Video Content */}
   <div className="flex items-start gap-3 w-full px-3 pt-3 relative">
     <img
       src={videodata?.ownerinfo?.avatar}
       alt="no avatar"
       className="w-9 h-9 rounded-full object-cover flex-shrink-0 cursor-pointer"
       onClick={chaneldashboard}
     />
     <div className="flex flex-col flex-1 min-w-0">
       <p className="text-sm font-medium line-clamp-2 leading-5 text-gray-900 group-hover:text-black">{videodata.tittle}</p>
       <span className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer mt-1">{videodata?.ownerinfo?.fullName}</span>
       <div className="flex items-center gap-1 mt-1">
         <span className="text-sm text-gray-600">{`${videodata.views} views`}</span>
         <span className="text-gray-600">•</span>
         <span className="text-sm text-gray-600">{timeAgo(videodata.createdAt)}</span>
         {!ispublic && <span className="text-gray-600">•</span>}
         {!ispublic && <span className="text-sm text-gray-600">Private</span>}
       </div>
     </div>
   </div>

   
</div>
)
}