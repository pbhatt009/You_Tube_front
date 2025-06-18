import { use, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Header,Footer,Sidebar} from './utils/index.js';
import { Outlet,Navigate } from 'react-router-dom';
import { login } from './Requsets/User.requests.js';
import { useDispatch,useSelector } from 'react-redux';
function App() {
  const [message,setmessage]=useState("");
  const[auth,setauth]=useState(false);
  const[data,setdata]=useState({})
//     useEffect(()=>{
//       setdata(login({
//     "username":"check3",
//     "password":"PBhatt@009"
// }))
// setmessage("hi")
//     },[])
//     useEffect(()=>{
// console.log(data);
//     },[data])

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userdata);

 useEffect(()=>{
    setauth(authStatus);
    setdata(userData);
 },[authStatus, userData])

 if(!auth){
  return (
    <Navigate to="/register" replace={true} />
  )
 }

else return (
  <div className='min-h-screen flex flex-wrap content between bg-gray-400 gap-0'>
<div className='w-full'>
<Header className="sticky top-0 z-50" />
<div className='flex flex-row relative top-20'>
<Sidebar/>
<main>
<Outlet/>
</main>
</div>
<Footer/>

</div>
  
   </div>
 
  )
}

export default App
