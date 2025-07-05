import { getwatchhistory} from "../utils/index.js";
import { useState,useEffect, useCallback } from "react";
import VideoContainer from "../components/Video.conatainer.jsx";
function WatchHistory(){
    const [watchhistoryarr,setwhistory]=useState([])
   
    const [eror,seteror]=useState("");
    const [loading,setloading]=useState(false);
    const getWatchHistoryfn=useCallback(async ()=>{
        seteror("");
        setloading(true);
     const result=await getwatchhistory()
     if(result.error){
          seteror(result.error.message)
          setloading(false);
          return;
     }
     setwhistory(result.data.data);

     setloading(false);

    },[])    
    useEffect(()=>{
          getWatchHistoryfn()

    },[])
    useEffect(()=>{
        // console.log(watchhistoryarr)
      
    },[watchhistoryarr])

    return (
      <div>
        {loading ? (
        <div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
          <p>Loading..</p>
          </div>   
        ) :
        
        (
         <div className="flex flex-wrap mt-5 gap-2 ml-2 mr-1 mb-18 overflow-y-auto sm:mb-5">
    {watchhistoryarr?.length!==0?
    (watchhistoryarr.map((video) => {
       
      return (<VideoContainer key={video._id} videodata={video}/>)
})):
<div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
  <p>No Watch history</p>
  </div>   

    }
  </div>
        )
        
        }
      </div>
    )







}
 export default WatchHistory