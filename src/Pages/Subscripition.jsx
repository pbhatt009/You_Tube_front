import { getsubscripition } from "../utils/index.js";
import { useState,useEffect, useCallback } from "react";
import Chanel_Container from "../components/Channel_container.jsx";
function Subscripition(){
    const [channelarr,setsubs]=useState([])
    const [subscripitioncnt,setcnt]=useState(0);
    const [eror,seteror]=useState("");
    const [loading,setloading]=useState(false);
    const getsubscripitionfn=useCallback(async ()=>{
        seteror("");
        setloading(true);
     const result=await getsubscripition();
     if(result.error){
          seteror(result.error.message)
          setloading(false);
          return;
     }
     setsubs(result.data.data);
     setcnt(result.data.data.length)
     setloading(false);

    },[])    
    useEffect(()=>{
          getsubscripitionfn()

    },[])
    useEffect(()=>{
        // console.log(channelarr)
        // console.log(subscripitioncnt)
    },[channelarr,subscripitioncnt])

    return (
      <div>
        {loading ? (
        <div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
          <p>Loading..</p>
          </div>   
        ) :
        
        (
         <div className="flex flex-wrap mt-5 gap-2 ml-2 mr-1 mb-18 overflow-y-auto sm:mb-5">
    {channelarr?.length!==0?
    (channelarr.map((chanel) => {
       
      return (<Chanel_Container key={chanel.Chanelinfo[0]._id} channel={chanel.Chanelinfo[0]} />)
})):
<div className="w-full h-100 flex justify-center items-center text-gray-800  text-2xl ">
  <p>No Subscribed channel Found</p>
  </div>   

    }
  </div>
        )
        
        }
      </div>
    )







}
 export default Subscripition