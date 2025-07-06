
import { getAllVideos,getchanneldetails,timeAgo } from "../utils/index.js"
import { useCallback, useEffect, useState } from "react"


import { XCircleIcon } from "@heroicons/react/24/outline"
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
         const allvideos=await getAllVideos(filter)
        
         
         
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
<div className="flex flex-col w-full h-full text-black">
 <div className="w-full h-10 flex  flex-col justify-around  bg-gray-700">
    <div className="flex  justify-around">
    <button className="ml-10  bg-black text-white rounded-2xl h-10 w-20 flex justify-center items-center " onClick={chnageshow}>{showfilter?<XCircleIcon className="h-7 w-7"/>:`Filter`}</button>
  
 </div>
    
   <form hidden={!showfilter} onSubmit={handleSubmit} className="flex flex-col ml-10 mt-2 rounded-2xl bg-gray-700 p-3 w-[55%] md:w-[30%] lg:w-[20%] z-100 ">
        <div className="flex flex-row gap-5 items-center">
            <label className="text-white" htmlFor="sortBy">SortBy</label>
          <select
         id="sortBy"
          name="sortBy"
           className="mb-3 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
             value={formdata.sortBy}
           onChange={handleChange}
               >
           <option value="views">views</option>
             <option value="duration">duration</option>
             <option value="createdAt">Created At</option>
            </select>
            </div>

                <div className="flex flex-row  gap-2 items-center">
            <label className="text-white" htmlFor="sortType">sortType</label>
          <select
         id="sortType"
          name="sortType"
           className="mb-3 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
             value={formdata.sortType}
           onChange={handleChange}
               >
           <option value={-1}>Descending</option>
             <option value={1}>Accesnding</option>
            
            </select>
            </div>
            <button type="Submit" className=" text-white bg-black h-8 rounded-full">Filter</button>
    </form>
 </div>
{loading ? (
<div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
  <p>Loading..</p>
  </div>   
) :

(
  <div className="flex flex-wrap mt-5 gap-2 ml-2 mr-1 mb-18 overflow-y-auto sm:mb-5">
    {videoarr?.length!==0?
    (videoarr.map((video) => {
       
      return (<VideoContainer key={video._id} videodata={video} />)
})):

<div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
  <p>No Video Uploaded Yet...</p>
  </div>   
}
  </div>
)

}
</div>
)}
