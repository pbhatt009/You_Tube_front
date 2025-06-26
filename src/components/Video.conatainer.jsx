
export default function VideoContainer({videodata}){


return(
<div className="flex flex-col">
<img src={videodata.thumbnail} alt="No Thumbnail" className="w-full h-[60%]" />
<div className="flex w-full">
    <img src={videodata.ownerinfo.thumbnail} alt="" />
    <p className="">{videodata.tittle}</p>
</div>
 <div className="flex ">
    <span>{videodata.ownerinfo.fullName}</span>
    
 </div>
 <div className="flex flex-row">
   <span>{`${videodata.views} views`}</span>
    <span> {timeAgo(videodata.createdAt)}</span>

 </div>

</div>

)



}