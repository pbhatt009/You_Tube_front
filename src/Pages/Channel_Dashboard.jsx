import React, { useEffect,useCallback } from "react";
import VideoContainer from "../components/Video.conatainer.jsx";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useSelector } from "react-redux";
import { subscribe } from "../Requsets/subscripition.js";
import { getAllVideos} from "../utils/index.js"

export default function ChannelDashboard() {
    const userdetails=useSelector(state=>state.auth.userdata);
    const location=useLocation()
     const{channel}=location.state||{};
    const[isMyChannel,setmychanel]=useState(false);
    const[eror,seterror]=useState({})
    useEffect(()=>{
           console.log("user",userdetails)   
           if(channel._id===userdetails._id) setmychanel(true);
    },[userdetails])
     const[issub,setissub]=useState(channel.issubscribed)
       const handelsubsucribe=async ()=>{
          let result
            if(channel.issubscribed ){
              result=await unsubscribe(channel.username)

            }
            else{
             result=await subscribe(channel.username)
            }
            if(result.error){
                seterror(result.error.message)
                return;
            }
            console.log("i am here")
            setissub(prev=>!prev)
            return;
    }
  /////video handeling
//   const[filter,setfilter]=useState({})
//     const [formdata,setformdata]=useState({})
//     const[showfilter,setshowfilter]=useState(false)
//   const[videoarr, setvideos]=useState([])


  console.log(channel.coverImage)
  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-scroll">
      {/* Cover Image */}
      <div className="w-full h-60 relative">
        {channel.coverImage?<img
          src={channel.coverImage}
          alt="Cover Image not found"
          className="w-full h-full object-cover rounded-lg"
               onClick={() => window.open( channel.coverImage,'_blank')}
        />:
        <div className="w-full h-60  object-cover rounded-lg justify-center items-center flex bg-gray-200">
          <p className="text-3xl">no cover image</p>
        </div>
        }
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <img
            src={channel.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white"
            onClick={() => window.open(channel.avatar, '_blank')}
          />
        </div>
      </div>

      {/* Channel Info */}
      <div className="mt-12 px-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{channel.fullName}</h2>
        <p className="text-gray-600">@{channel.username}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>{channel.subscriberCount} Subscribers</span>
          <span>{channel.channelsSubscribedToCount} Subscribed</span>
      
        </div>

        {isMyChannel?(
          <div className="mt-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Edit Channel
            </button>
          </div>
        ):
         ( <button
  onClick={handelsubsucribe}
    className={`px-4 py-1 rounded-md font-medium text-sm transition w-40 
      ${issub
        ? 'bg-gray-500 text-white' 
        : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
  >
    {issub ? "Subscribed" : "Subscribe"}
  </button>)
        }
      </div>

      {/* Videos */}
      <div className="px-4">
        <h3 className="text-xl font-semibold mb-4">Videos</h3>
        <div className="flex flex-wrap gap-4 mb-15 sm:mb-5">
          {channel.Channelvideos && channel.Channelvideos.length > 0 ? (
            channel.Channelvideos.map((video) => (
              <VideoContainer
                key={video._id}
                videodata={video}
                // isEditable={isMyChannel} // You can use this inside VideoContainer to show "Edit"
              />
            ))
          ) : (
            <p className="text-gray-500">No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
