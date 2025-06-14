import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Header,Footer } from './utils/index.js';
import { Outlet } from 'react-router-dom';
import { login } from './Requsets/User.requests.js';

function App() {
  const [message,setmessage]=useState("");
  const[data,setdata]=useState({})
    useEffect(()=>{
      setdata(login({
    "username":"check3",
    "password":"PBhatt@009"
}))
setmessage("hi")
    },[])
    useEffect(()=>{
console.log(data);
    },[data])

return (
//   <div className='min-h-screen flex flex-wrap content between bg-gray-400'>
// <div className='w-full'>
// <Header/>
// <main>
// <Outlet/>
// </main>
// <Footer/>
// </div>
  
//    </div>
   <h1 className='color-black'>{message}</h1>
  )
}

export default App
