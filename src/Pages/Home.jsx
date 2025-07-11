import { useSelector,useDispatch } from "react-redux"
import { getAllVideos,getchanneldetails,timeAgo } from "../utils/index.js"
import { useCallback, useEffect, useState } from "react"

import { all } from "axios"
import { XCircleIcon } from "@heroicons/react/24/outline"
import VideoContainer from "../components/Video.conatainer.jsx"
import Chanel_Container from "../components/Channel_container.jsx"

export default function HomePage(){

    
    const [filter,setfilter]=useState()
    const[videoarr,setvideos]=useState([])
    const[loading,setLoading]=useState(true)
    const [error,seterror]=useState({
        channeleror:"",
        videoeror:"",
       
    })
    const[page,setpage]=useState({})
    const [formdata,setformdata]=useState({})
    const[showfilter,setshowfilter]=useState(false)
    const[query,setquery]=useState('')
    const[channelarr,setchannel]=useState([])
    const chnageshow=()=>{
          setshowfilter(prev=>!prev)
    }
    const getvideosChannel=useCallback(async()=>{
         seterror({  channeleror:"",videoeror:"",})
        //  console.log(filter)
         const allvideos=await getAllVideos(filter)
         if(query){
         const chanels=await getchanneldetails(query)
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
          
              
         setLoading(false)
    },[filter])
    useEffect(()=>{
          console.log("chanels",channelarr)
         console.log("videosss",videoarr[0]?.ownerinfo)
    },[videoarr,channelarr])
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
  const tquery=useSelector(state=>state.query.query)
  if(tquery!=query) setquery(tquery)
  const updatequery=useCallback(()=>{
   
    setfilter(prev=>({...prev,query:query}))
     
},[query])
useEffect(()=>{
    updatequery()
},[query])
const[channelpage,setchannelpage]=useState(false);
const channelpagechange=()=>{
      setchannelpage(prev=>!prev);
}

    return(
<div className="flex flex-col w-full h-full text-black">
 <div className="w-full h-10 flex  flex-col justify-around  bg-gray-700">
    <div className="flex  justify-around">
    <button className="ml-10  bg-black text-white rounded-2xl h-10 w-20 flex justify-center items-center " onClick={chnageshow}>{showfilter?<XCircleIcon className="h-7 w-7"/>:`Filter`}</button>
  
    <button disabled={!channelpage} className={`ml-10 'bg-black'  ${channelpage?'text-white':'text-blue-400'} bg-black rounded-2xl h-10 w-20 flex justify-center items-center `} onClick={channelpagechange} >Videos</button>
    <button  disabled={channelpage} className={`ml-10 mr-10 bg-black ${channelpage?'text-blue-400':'text-white'} rounded-2xl h-10 w-20 flex justify-center items-center`} onClick={channelpagechange} >Channel</button>
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
 (!channelpage)?
(
  <div className="flex flex-wrap mt-5 gap-2 ml-2 mr-1 mb-3 overflow-y-auto ">
    {videoarr?.length!==0?
    (videoarr.map((video) => {
       
      return (video?.isPublic)?(<VideoContainer key={video._id} videodata={video} />):<></>
})):

<div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
  <p>No Video Found</p>
  </div>   
}
  </div>
):

  <div className="flex flex-wrap mt-5 gap-2 ml-2 mr-1  overflow-y-auto mb-3">
    {channelarr?.length!==0?
    (channelarr.map((chanel) => {
       
      return (<Chanel_Container key={chanel._id} channel={chanel} />)
})):
<div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
  <p>No Channel Found</p>
  </div>   

    }
  </div>






}



</div>













)}
