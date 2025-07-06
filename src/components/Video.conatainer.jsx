import React, { useState ,useEffect} from "react"
import { timeAgo } from "../utils"
import { useSelector } from "react-redux";
import { getchanneldetails } from "../utils/index.js";
import { useNavigate } from "react-router-dom";
import { changestatus } from "../utils/index.js";

export default function VideoContainer({videodata}){
   const userdetails=useSelector(state=>state.auth.userdata);
     const[ismine,setismine]=useState(false);
       const[error,seterror]=useState("");
       const[ispublic,setpublic]=useState(videodata.isPublic)
     const navigate=useNavigate()
    useEffect(() => {
    
  if (userdetails && videodata && userdetails._id === videodata.owner) {
    setismine(true);
  } else {
    setismine(false);
  }
}, [userdetails, videodata]);



const parentclick=(e)=>{

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
const setchangestatus=async(e)=>{
  e.stopPropagation();
  const result=await changestatus(videodata._id)
  if(result.error) return;
  setpublic(prev=>!prev)
  
}
return(
<div className=" box-border  flex flex-col w-full  max-w-sm rounded-xl shadow-md bg-white overflow-hidden gap-2"
onClick={parentclick}>
  <img
    src={videodata.thumbnail}
    alt="No Thumbnail"
    className="w-full h-48 object-cover"
  />

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