import React from "react"
import { timeAgo } from "../utils"
export default function VideoContainer({videodata}){


return(
<div className=" box-border  flex flex-col w-full  max-w-sm rounded-xl shadow-md bg-white overflow-hidden gap-2">
  <img
    src={videodata.thumbnail}
    alt="No Thumbnail"
    className="w-full h-48 object-cover"
  />

  <div className="flex items-start gap-3 px-3">
    <img
      src={videodata?.ownerinfo?.avatar}
      alt="no avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <p className="text-base font-semibold line-clamp-2">{videodata.tittle}</p>
      <span className="text-sm text-gray-600">{videodata?.ownerinfo?.fullName}</span>
    </div>
  </div>

  <div className="flex justify-between text-sm text-gray-500 px-3 pb-3">
    <span>{`${videodata.views} views`}</span>
    <span>{timeAgo(videodata.createdAt)}</span>
  </div>
</div>


)



}