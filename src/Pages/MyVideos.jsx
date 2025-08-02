import { getAllmineVideos,getchanneldetails,timeAgo } from "../utils/index.js"
import { useCallback, useEffect, useState } from "react"
import { XCircleIcon, FunnelIcon, SparklesIcon, VideoCameraIcon } from "@heroicons/react/24/outline"
import VideoContainer from "../components/Video.conatainer.jsx"

export default function Myvideos(){
    const intialfilter={
    page:1,
    limit:10,
    query:"",
    sortBy:'views',
    sortType:-1,
    mine:1}
    
    const [filter,setfilter]=useState(intialfilter)
    const[videoarr,setvideos]=useState([])
    const[loading,setLoading]=useState(true)
    const [error,seterror]=useState({
       
        videoeror:"",
       
    })
    const[page,setpage]=useState({})
    const [formdata,setformdata]=useState(intialfilter)
    const[showfilter,setshowfilter]=useState(false)

    const chnageshow=()=>{
          setshowfilter(prev=>!prev)
    }
    const getvideosChannel=useCallback(async()=>{
         seterror({ videoeror:"",})
        //  console.log(filter)
         const allvideos=await getAllmineVideos(filter)
        
         
         
         if(allvideos.error){
            seterror(prev=>({...prev,videoeror:allvideos.error.message}))
             setLoading(false)
            return;
        }
       
    
         setvideos(allvideos.data.data.itemsList);
         setpage(allvideos.data.data.paginator)
          
              
         setLoading(false)
    },[filter])
    useEffect(()=>{
        
         console.log("videosss",videoarr[0]?.ownerinfo)
    },[videoarr])
    useEffect(()=>{
          setLoading(true)
          getvideosChannel()
          
         
    },[filter])
    const handleChange=(e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
          setformdata(prev=>({...prev,[e.target.name]:e.target.value}))
          return;

    }
    function handleSubmit(e){
     
      e.preventDefault();
       setfilter(formdata)

    }
    return(
<div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
 {/* Modern Header Section */}
 <div className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
    <div className="w-full px-3 sm:px-6 lg:px-8">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-center py-3 sm:py-4">
        {/* Filter Button */}
        <button 
          className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm border text-sm sm:text-base ${
            showfilter 
              ? 'bg-red-500 text-white border-red-500 shadow-red-500/25' 
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`} 
          onClick={chnageshow}
        >
          {showfilter ? (
            <>
              <XCircleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Close Filter</span>
              <span className="sm:hidden">Close</span>
            </>
          ) : (
            <>
              <FunnelIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Filter My Videos</span>
              <span className="sm:hidden">Filter</span>
            </>
          )}
        </button>
      </div>
    
      {/* Filter Form - Desktop */}
      <div className={`hidden sm:block transition-all duration-500 ease-in-out overflow-hidden ${
        showfilter ? 'max-h-96 opacity-100 mb-3 sm:mb-4' : 'max-h-0 opacity-0'
      }`}>
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 w-full max-w-sm sm:max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filter My Videos</h3>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="sortBy">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="w-full px-3 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-sm sm:text-base"
                value={formdata.sortBy}
                onChange={handleChange}
              >
                <option value="views">Most Viewed</option>
                <option value="duration">Duration</option>
                <option value="createdAt">Latest</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2" htmlFor="sortType">
                Sort Order
              </label>
              <select
                id="sortType"
                name="sortType"
                className="w-full px-3 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-sm sm:text-base"
                value={formdata.sortType}
                onChange={handleChange}
              >
                <option value={-1}>Descending</option>
                <option value={1}>Ascending</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 sm:py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
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
           <h3 className="text-lg font-semibold text-gray-900">Filter My Videos</h3>
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
 <div className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
   {loading ? (
     <div className="flex flex-col items-center justify-center py-12 sm:py-20">
       <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-red-500 mb-3 sm:mb-4"></div>
       <p className="text-gray-600 text-base sm:text-lg font-medium text-center">Loading your videos...</p>
     </div>   
   ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
       {videoarr?.length !== 0 ? (
         videoarr.map((video) => {
           return <VideoContainer key={video._id} videodata={video} prev="/my-videos" />
         })
       ) : (
         <div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-20">
           <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
             <VideoCameraIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
           </div>
           <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 text-center">No Videos Uploaded Yet</h3>
           <p className="text-gray-600 text-center max-w-md text-sm sm:text-base px-4">
             Start creating amazing content by uploading your first video!
           </p>
         </div>   
       )}
     </div>
   )}
 </div>
</div>
)
}
