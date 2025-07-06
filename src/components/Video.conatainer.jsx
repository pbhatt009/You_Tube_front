import React, { useState ,useEffect} from "react"
import { timeAgo } from "../utils"
import { useSelector } from "react-redux";
export default function VideoContainer({videodata}){
   const userdetails=useSelector(state=>state.auth.userdata);
     const[ismine,setismine]=useState(false);
    useEffect(() => {
  if (userdetails && videodata && userdetails._id === videodata.owner) {
    setismine(true);
  } else {
    setismine(false);
  }
}, [userdetails, videodata]);
return(
<div className=" box-border  flex flex-col w-full  max-w-sm rounded-xl shadow-md bg-white overflow-hidden gap-2">
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
    />
    <div className="flex flex-col">
      <p className="text-base font-semibold line-clamp-2">{videodata.tittle}</p>
      <span className="text-sm text-gray-600">{videodata?.ownerinfo?.fullName}</span>
    </div>
    <div className="text-gray-600 text-xs absolute right-10 justify-center self-center">
      {videodata.isPublic?"Public":"Private"}
    </div>
  </div>

  <div className="flex justify-between text-sm text-gray-500 px-3 pb-3">
    <span>{`${videodata.views} views`}</span>
    <button hidden={!ismine} disabled={!ismine} className="bg-blue-700 text-white w-15 h-6 rounded-2xl">Edit</button>
    <span>{timeAgo(videodata.createdAt)}</span>
  </div>
</div>


)



}