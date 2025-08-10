import { useSelector,useDispatch } from "react-redux"
import { getAllVideos,getchanneldetails,timeAgo } from "../utils/index.js"
import { use, useCallback, useEffect, useState } from "react"
import{addallvideos,addvideo,removeallvideos,removevideo,updatevideo,addallmyvideo,removeallmyvideo} from "../Store/video_manager.jsx"
import { all } from "axios"
import { XCircleIcon, FunnelIcon, VideoCameraIcon, UserGroupIcon, SparklesIcon } from "@heroicons/react/24/outline"
import VideoContainer from "../components/Video.conatainer.jsx"
import Chanel_Container from "../components/Channel_container.jsx"

export default function HomePage(){
    const tquery=useSelector(state=>state.query.query)
    const dispatch=useDispatch()
    let filter={}
    const storevideos=useSelector(state=>state.video.videoarr)
    console.log("storevideos",storevideos)
    const[videoarr,setvideos]=useState(storevideos)
    const[loading,setLoading]=useState(false)
    const [error,seterror]=useState({
        channeleror:"",
        videoeror:"",
       
    })
    const[page,setpage]=useState({})
    const [formdata,setformdata]=useState({})
    const[showfilter,setshowfilter]=useState(false)
    const[query,setquery]=useState(tquery)
    const[channelarr,setchannel]=useState([])
    const chnageshow=()=>{
          setshowfilter(prev=>!prev)
    }
    const getvideosChannel=(async()=>{
      setLoading(true)
         seterror({  channeleror:"",videoeror:"",})
        //  console.log(filter)
         const allvideos=await getAllVideos(filter)
         if(tquery){
          
         const chanels=await getchanneldetails(tquery)
           if(chanels.error){
            seterror(prev=>({...prev,channeleror:chanels.error.message}))
            }
       
         else setchannel(chanels.data.data)
              console.log(chanels.data)
         }
        else  setchannel([])
         
         
         if(allvideos.error){
            seterror(prev=>({...prev,videoeror:allvideos.error.message}))
           
        }
       
         if(error.videoeror||error.channeleror){
             setLoading(false)
             return;
         }
       
         setvideos(allvideos.data.data.itemsList);
         setpage(allvideos.data.data.paginator)
          dispatch(addallvideos(allvideos.data.data.itemsList))
              
         setLoading(false)
    })
    useEffect(()=>{
          // console.log("chanels",channelarr)
        //  console.log("videosss",videoarr[0]?.ownerinfo)
    },[videoarr,channelarr])
    useEffect(()=>{
          if(storevideos.length!=0) {
            return;
          }
          // console.log("getting videos")

          getvideosChannel()
          
         
    },[])
    const handleChange=(e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
          setformdata(prev=>({...prev,[e.target.name]:e.target.value}))
          return;

    }
    function handleSubmit(e){
     
      e.preventDefault();
       filter=formdata;
        

        getvideosChannel()

    }

  if(tquery!==query){
     setquery(tquery)
      filter={...filter,query:tquery}
      // console.log("query changed",tquery)
      getvideosChannel()
  }


const[channelpage,setchannelpage]=useState(false);
const channelpagechange=()=>{
      setchannelpage(prev=>!prev);
}

    return(
<div className="flex flex-col w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
 {/* Modern Header Section */}
 <div className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation Tabs */}
      <div className="flex sticky items-center justify-between py-4">
        {/* Filter Button */}
        <button 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm border ${
            showfilter 
              ? 'bg-red-500 text-white border-red-500 shadow-red-500/25' 
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`} 
          onClick={chnageshow}
        >
          {showfilter ? (
            <>
              <XCircleIcon className="h-4 w-4" />
              Close Filter
            </>
          ) : (
            <>
              <FunnelIcon className="h-4 w-4" />
              Filter
            </>
          )}
        </button>

        {/* Content Type Tabs */}
        <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner">
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              !channelpage 
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                : 'text-gray-600 hover:text-gray-900'
            }`} 
            onClick={channelpagechange}
          >
            <VideoCameraIcon className="h-4 w-4" />
            Videos
          </button>
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              channelpage 
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                : 'text-gray-600 hover:text-gray-900'
            }`} 
            onClick={channelpagechange}
          >
            <UserGroupIcon className="h-4 w-4" />
            Channels
          </button>
        </div>
      </div>
    
      {/* Filter Form - Desktop */}
      <div className={`hidden sm:block transition-all duration-500 ease-in-out overflow-hidden ${
        showfilter ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
      }`}>
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <SparklesIcon className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sortBy">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                value={formdata.sortBy}
                onChange={handleChange}
              >
                <option value="views">Most Viewed</option>
                <option value="duration">Duration</option>
                <option value="createdAt">Latest</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sortType">
                Sort Order
              </label>
              <select
                id="sortType"
                name="sortType"
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                value={formdata.sortType}
                onChange={handleChange}
              >
                <option value={-1}>Descending</option>
                <option value={1}>Ascending</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
 </div>

 {/* Mobile Filter Modal */}
 {showfilter && (
   <div className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
     <div className="w-full bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 ease-out">
       <div className="flex items-center justify-between p-6 border-b border-gray-100">
         <div className="flex items-center gap-2">
           <SparklesIcon className="h-5 w-5 text-red-500" />
           <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3>
         </div>
         <button 
           onClick={chnageshow}
           className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
         >
           <XCircleIcon className="h-6 w-6 text-gray-500" />
         </button>
       </div>
       
       <form onSubmit={handleSubmit} className="p-6 space-y-6">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-3" htmlFor="mobileSortBy">
             Sort By
           </label>
           <select
             id="mobileSortBy"
             name="sortBy"
             className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-base"
             value={formdata.sortBy}
             onChange={handleChange}
           >
             <option value="views">Most Viewed</option>
             <option value="duration">Duration</option>
             <option value="createdAt">Latest</option>
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-3" htmlFor="mobileSortType">
             Sort Order
           </label>
           <select
             id="mobileSortType"
             name="sortType"
             className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-base"
             value={formdata.sortType}
             onChange={handleChange}
           >
             <option value={-1}>Descending</option>
             <option value={1}>Ascending</option>
           </select>
         </div>
         
         <div className="flex gap-3 pt-4">
           <button 
             type="button"
             onClick={chnageshow}
             className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl transition-all duration-200 hover:bg-gray-200"
           >
             Cancel
           </button>
           <button 
             type="submit" 
             className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
           >
             Apply Filters
           </button>
         </div>
       </form>
     </div>
   </div>
 )}

 {/* Content Section */}
 <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
   {loading ? (
     <div className="flex flex-col items-center justify-center py-20">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
       <p className="text-gray-600 text-lg font-medium">Loading amazing content...</p>
     </div>   
   ) : !channelpage ? (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       {videoarr?.length !== 0 ? (
         videoarr.map((video) => {
           return video?.isPublic ? (
             <VideoContainer key={video._id} videodata={video} />
           ) : null
         })
       ) : (
         <div className="col-span-full flex flex-col items-center justify-center py-20">
           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
             <VideoCameraIcon className="h-12 w-12 text-gray-400" />
           </div>
           <h3 className="text-xl font-semibold text-gray-900 mb-2">No Videos Found</h3>
           <p className="text-gray-600 text-center max-w-md">
             Try adjusting your search terms or filters to discover amazing content
           </p>
         </div>   
       )}
     </div>
   ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       {channelarr?.length !== 0 ? (
         channelarr.map((chanel) => {
           return <Chanel_Container key={chanel._id} channel={chanel} />
         })
       ) : (
         <div className="col-span-full flex flex-col items-center justify-center py-20">
           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
             <UserGroupIcon className="h-12 w-12 text-gray-400" />
           </div>
           <h3 className="text-xl font-semibold text-gray-900 mb-2">No Channels Found</h3>
           <p className="text-gray-600 text-center max-w-md">
             We couldn't find any channels matching your search. Try different keywords.
           </p>
         </div>   
       )}
     </div>
   )}
 </div>
</div>
)
}
