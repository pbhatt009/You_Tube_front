import React, { useCallback, useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getchanneldetails,getVideoById,getAllComments,subscribe,unsubscribe,addliketoVideo,addliketocomment,unlikevideo,unlikecomment ,addComment,updateComment,deleteComment} from '../utils';
import { XCircleIcon,PencilIcon } from '@heroicons/react/24/outline';

export default function VideoDashboard() {
const currentuser=useSelector(state=>state.auth.userdata)

const location=useLocation()
const navigate=useNavigate()
  const{video}=location.state||{}
const[subscribercnt,setsubcnt]=useState(video.ownerinfo?.subscriberCount)
  const[comments,setcomments]=useState([])
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(video.isliked);
  const [likes, setLikes] = useState(video.likedby);
  const[ismine,setismine]=useState(false)
  const [isSubscribed, setIsSubscribed] = useState(video.ownerinfo?.issubscribed);
  const[page,setpage]=useState(1)
  const[limit,setlimit]=useState(30)
   const[error,seteror]=useState({})
//    console.log("liked",liked)
//    console.log("cnt",likes)
  const getcomments=useCallback(async()=>{
    seteror({})
       const re=await getAllComments(video._id,{page:page||1,limit:limit||30})
       if(re.error){
        seteror(prev=>({...prev,comment:re.error.message}))
        return;
       }
       setcomments(re.data.data.itemsList)
       return;
    
  },[page,limit])
  
  useEffect(()=>{
     getcomments();
  },[page,limit])
  useEffect(()=>{
if(currentuser._id===video.ownerinfo_id) setismine(true);
  },[])



  const handleLikeVideo = async(e) => {
    e.preventDefault()
        seteror({})
    if(liked){
        const result=await unlikevideo(video._id)
        if(result.error){
             seteror(prev=>({...prev,unlikevideo:result.error.message}))
             return;
        }
        // console.log(result)
        setLiked(false);
        setLikes(prev=>(prev-1))

    }
    else{
        
     const result=await addliketoVideo(video._id)
        if(result.error){
             seteror(prev=>({...prev,likevideo:result.error.message}))
             return;
        }
        setLiked(true);
         setLikes(prev=>(prev+1))
    }
   
  };

const chaneldashboard=async(e)=>{
   
    seteror({})
    const result=await getchanneldetails(video?.ownerinfo?.username);
    if(result.error) {
      seteror(prev=>({...prev,general:result.error.message}))
      return;
    }
    const chanel=result.data.data
    navigate('/dashboard', { state:{ channel:chanel[0]}});
}

  const handleAddComment =async () => {
        seteror({})
    if (newComment.trim()) {
       const result=await addComment(video._id,{comment:newComment})
        if(result.error){
            seteror(prev=>({...prev,comment:result.error.message}))
            return;
        }
        getcomments()
      setNewComment("");
    }
    else{
        seteror(prev=>({...prev,comment:"add comment"}))
    }
  };
    const handleSubscribe=async ()=>{
          let result
            if(isSubscribed){
              result=await unsubscribe(video.ownerinfo?.username)

            }
            else{
             result=await subscribe(video.ownerinfo?.username)
            }
            if(result.error){
                seteror(prev=>({...prev,subscripition:result.error.message}))
                return;
            }
            if(isSubscribed){
                setsubcnt(prev=>(prev-1))
            }
            else setsubcnt(prev=>(prev+1))
            setIsSubscribed(prev=>!prev)
            return;
    }
    const editvideo=(e)=>{
   
   navigate('/updateVideo',{ state:{videoData:video}})

}

  return (
    <div className='w-[100%] h-full flex flex-col p-2 sm:p-10 overflow-y-scroll'>
    <div className="max-w-4xl">

      {/* Video Player */}
      <div className="relative w-full rounded overflow-hidden shadow">
        <video
          src={video.videoFile}
          controls
          className="w-full h-auto rounded"
        />
      </div>
{/* Owner Info + Subscribe Button */}
<div className='bg-white p-[1px] sm:pt-3  sm:pb-5 sm:pl-2 sm:pr-2'>
<div className="flex items-center justify-between mb-4 mt-4 bg-white">
  <div className="flex items-center gap-4">
    <img
    onClick={chaneldashboard}
      src={video.ownerinfo?.avatar}
      alt="Avatar"
      className="w-12 h-12 rounded-full border"
    />
    <div>
      <h2 className="font-semibold text-md">{video.ownerinfo?.fullName}</h2>
      <p className="text-sm text-gray-500">@{video.ownerinfo?.username}</p>
    </div>
   
  </div>
 <div className='flex flex-col items-center'>
  <button
    onClick={handleSubscribe}
    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
      isSubscribed ? "bg-green-600 text-white" : "bg-gray-200"
    }`}
  >
    {isSubscribed ? "Subscribed" : "Subscribe"}
  </button>
  <span>{subscribercnt}</span>
</div>

</div>

{/* Title + Views + Likes */}
<div className="space-y-2">
  <h1 className="text-xl font-bold">{video.tittle}</h1>
  <div className="flex items-center justify-between text-sm text-gray-600">
    <span>{video.views} views • {new Date(video.createdAt).toDateString()}</span>
       <button hidden={!ismine} onClick={editvideo} className='px-4 py-1.5 rounded-full text-sm text-white font-medium bg-blue-800'>
    Edit
    </button>
    <button
      onClick={handleLikeVideo}
      className={`px-3 py-1 rounded-full text-sm ${
        liked ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
    >
      👍 {likes}
    </button>
  </div>
</div>
</div>

{/* Description */}
<div className="text-gray-800 mt-4 whitespace-pre-wrap border-t pt-4 pl-2 pb-4 pr-3 bg-white">
    <h1 className='text-lg font-semibold mb-2 bg-white'>Description:</h1>
  {video.description}
</div>

      {/* Comments Section */}
      <div className='mt-5'>
        <h2 className="text-lg font-semibold mb-2">Comments</h2>

        {/* Add Comment */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
         <div className='flex justify-center items-center'>{error?.comment && <p className="text-red-500 text-sm">{error?.comment}</p>} </div>

        {/* Existing Comments */}
        <div className="space-y-4 bg-white p-2">
          {comments.length>0&&comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} video={video} fn={getcomments} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

function CommentCard({ comment ,video,fn}) {
    const currentuser=useSelector(state=>state.auth.userdata)
    // console.log("coment",comment)
  const [liked, setLiked] = useState(comment.isliked);
  const [likes, setLikes] = useState(comment.likedby);
  const[isMine,setismine]=useState(false)
 const [isedit,setisedit]=useState(false)
  const [showOptions, setShowOptions] = useState(false);
  const[error,seterror]=useState("")
  const[content,setcontent]=useState(comment?.content)
  const navigate=useNavigate()
 const chaneldashboard=async(e)=>{
   
    seterror("")
    const result=await getchanneldetails(comment?.ownerinfo?.username);
    if(result.error) {
      seterror(prev=>(result.error.message))
      return;
    }
    const chanel=result.data.data
    navigate('/dashboard', { state:{ channel:chanel[0]}});
}
  useEffect(()=>{
   if(currentuser._id===comment.ownerinfo?._id)
    setismine(true)

  },[comment])

  const handleLike = async(e) => {
       e.preventDefault()
       seterror("")
    if(liked){
        const result=await unlikecomment(comment._id)
        if(result.error){
             seterror("Eror in unliking video")
             return;
        }
        // console.log(result)
        setLiked(false);
        setLikes(prev=>(prev-1))

    }
    else{
        
     const result=await addliketocomment(comment._id)
        if(result.error){
              seterror("Eror in liking video")
             return;
        }
        setLiked(true);
         setLikes(prev=>(prev+1))
    }
  };
 const editcommnet=async()=>{
    seterror("")
    if(!content.trim()){
        seterror("Comment should not be blank")
        return;
    }
    const re=await updateComment(video._id,comment._id,{
    content:content.trim()
})
if(re.error){
    seterror("error in updating comment")
    return;
}
 setisedit(false)
 

 }
 const Delete=async()=>{
    seterror("")
    const result=await deleteComment(video._id,comment._id)
    if(result.error){
        seterror("Eror in deleting Comment")
        return;
    }
     setismine(false)
     fn()



 }


  return (
    <div className='flex flex-col gap-2'>
    <div className="flex gap-3 h-14 items-center relative">
      {/* Avatar */}
      <img onClick={chaneldashboard}
        src={comment.ownerinfo?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
        alt="Avatar"
        className="w-10 h-10 rounded-full border"
      />

      {/* Content and Controls */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          {/* Comment Content */}
         <div className="w-40 sm:w-70 md:w-100 lg:w-130">
  <textarea
    disabled={!isedit}
    value={content}
    onChange={(e) => {
      setcontent( e.target.value);
    }}
    className={`pl-1 pr-1 w-full h-9 font-semibold text-sm resize-none
      ${isedit ? ' outline-1' : 'outline-none'}
      bg-transparent text-black overflow-y-auto`}
    style={{
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word',
    }}
  ></textarea>
</div>

          {/* Like and Edit/Delete Buttons */}
          <div hidden={isedit} className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`text-xs px-2 py-1 rounded-full ${
                liked ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              👍 {likes}
            </button>

            {isMine && (
              <div className="relative">
                <button
                  onClick={() => setShowOptions(prev => !prev)}
                  className="text-xs px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  {showOptions?<XCircleIcon className='h-6 w-6'/>:<PencilIcon className='h-5 w-5'/>}
                </button>

                {showOptions && (
                  <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow z-10 text-xs flex-col justify-center items-center">
                    <button
                      onClick={() => {
                        setShowOptions(false);
                        setisedit(true)
                      
                      }}
                      className="w-full border-b  text-left px-3 py-1 hover:bg-gray-100"
                    >
                      Edit Comment
                    </button>
                    <button
                      onClick={() => {
                        setShowOptions(false);
                        Delete()
                      
                      }}
                      className="w-full text-left px-3 py-1 hover:bg-red-100 twxt-black"
                    >
                    Delete 
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div hidden={!isedit} className="flex items-center gap-1 sm:gap-3">
            <button onClick={editcommnet} className='bg-blue-600 text-xs sm:text-s text-white h-8 sm:h-10  rounded-2xl pl-1 pr-1 text-center'>
                Update
            </button>
           
                <XCircleIcon onClick={()=>{
                seterror("")
                 setisedit(false)
                  setcontent(comment.content)
                }
               
            } className='h-6 w-6'/>
         

          </div>
        </div>
      </div>
      </div>
     {error&&<p className='text-red-500 self-center text-xs'>{error}</p>}
  
    </div>
  );
}
