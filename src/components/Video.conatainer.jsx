import React, { useState ,useEffect} from "react"
import { timeAgo } from "../utils"
import { useSelector } from "react-redux";
import { getchanneldetails } from "../utils/index.js";
import { replace, useNavigate } from "react-router-dom";
import { changestatus,deleteVideo } from "../utils/index.js";
import { AdjustmentsVerticalIcon,XCircleIcon } from "@heroicons/react/24/outline";
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



const parentclick=(e)=>{
console.log('hii parnet')
}
const chaneldashboard=async(e)=>{
    e.stopPropagation();
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
const[extrasetting,setextrasetting]=useState(false)
const setchangestatus=async(e)=>{
  e.stopPropagation();
  const result=await changestatus(videodata._id)
  if(result.error) return;
  setpublic(prev=>!prev)
  
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
<div className=" box-border  relative  flex flex-col w-full  max-w-sm rounded-xl shadow-md bg-white overflow-hidden gap-2"
onClick={parentclick}>
  <img
    src={videodata.thumbnail}
    alt="No Thumbnail"
    className="w-full h-48 object-cover"
  />
   <div hidden={!ismine}
    onClick={(e)=>{
    e.stopPropagation()
    setextrasetting(prev=>!prev)}}
     className="bg-black h-6 w-8 rounded-2xl absolute top-1 z-100 right-3">
   {!extrasetting? <AdjustmentsVerticalIcon className="h-6 w-8  text-amber-50"/>:
   <XCircleIcon className="h-6 w-8  text-amber-50"/>}

   </div>
   <div hidden={!extrasetting}className="flex flex-col absolute top-7 h-20 justify-center bg-transparent text-black text-s  rounded-xl w-40 z-100 right-3 ">
    <button onClick={setchangestatus} className="border h-10 hover:bg-amber-50 rounded-xl bg-gray-200">
      Change Status
    </button>
     <button 
      onClick={(e)=>{
    e.stopPropagation()
       setdeleteloading(false)
    setalert(prev=>!prev)}}
     className="border h-10 hover:bg-amber-50 rounded-xl bg-gray-200">
      Delete Video
    
      </button>
     
   </div>
   <div hidden={!showalert} className="bg-gray-200 gap-10 flex flex-col absolute h-[100%] justify-center items-center opacity-95 w-full z-101">
   {!deleteloading?(<div className="gap-10 flex flex-col absolute h-[100%] justify-center items-center w-full" > <p>Are you Sure?</p>
    <div className="flex gap-10">
      <button onClick={delete_video} className="bg-blue-700 text-white w-15 h-6 rounded-2xl">Yes</button>
       <button 
    onClick={(e)=>{
    e.stopPropagation()
 
    setalert(prev=>!prev)}}
       className="bg-blue-700 text-white w-15 h-6 rounded-2xl">No</button>
    </div>
     <div className='flex justify-center items-center'>{error && <p className="text-red-500 text-sm">{error}</p>} </div>

   </div>):
  ( <div>
     {!sucess?
     <p > Deleting the Video...  </p>:
    <div className='flex justify-center items-center'><p className="text-green-500 text-sm">{sucess}</p> </div>
     
     }
  </div>)
}
   </div>
  <div className="flex items-start gap-3 w-full px-3 relative">
    <img
      src={videodata?.ownerinfo?.avatar}
      alt="no avatar"
      className="w-10 h-10 rounded-full object-cover"
      onClick={chaneldashboard}
    />
    <div className="flex flex-col">
      <p className="text-base font-semibold line-clamp-2">{videodata.tittle}</p>
      <span className="text-sm text-gray-600">{videodata?.ownerinfo?.fullName}</span>
    </div>
    <div className="text-gray-600 text-xs absolute right-10 justify-center self-center">
     {ispublic?"Public":"Private"}
    </div>
  </div>

  <div className="flex justify-between text-sm text-gray-500 px-3 pb-3">
    <span>{`${videodata.views} views`}</span>
    <button hidden={!ismine} disabled={!ismine} onClick={edit} className="bg-blue-700 text-white w-15 h-6 rounded-2xl">Edit</button>
    <span>{timeAgo(videodata.createdAt)}</span>
  </div>
</div>


)



}