import { useState } from "react"
import { subscribe,unsubscribe } from "../utils/index.js"
import { useNavigate } from "react-router-dom"

function Chanel_Container({channel}){
    const[issub,setissub]=useState(channel.issubscribed)
    const [error,seterror]=useState("")
    const navigate=useNavigate()
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
            setissub(prev=>!prev)
            return;
    }
  const handleParentClick = () => {
    console.log("Parent div clicked");
    navigate('/dashboard', { state: { channel}});

  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // Prevents parent click
    console.log("Child button clicked");
    handelsubsucribe()
  };
return(<div  key={channel._id} onClick={handleParentClick} className="flex items-center w-full justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200">
  <div className="flex items-center space-x-4">
    <img
      src={channel.avatar}
      alt="avatar"
      className="w-14 h-14 rounded-full object-cover border"
    />
    <div>
      <h2 className="text-lg font-semibold">{channel.fullName}</h2>
      <p className="text-sm text-gray-600 overflow-auto">@{channel.username}</p>
      <p className="text-xs text-gray-500">{channel.subscriberCount} subscribers</p>
    </div>
  </div>
  
  <button
  onClick={handleChildClick}
    className={`px-4 py-1 rounded-md font-medium text-sm transition 
      ${issub
        ? 'bg-gray-300 text-gray-700' 
        : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
  >
    {issub ? "Subscribed" : "Subscribe"}
  </button>
</div>)
}
export default Chanel_Container