import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Header,Footer } from './utils/index.js';
import { Outlet } from 'react-router-dom';

function App() {
  const [message,setmessage]=useState("");
    useEffect(()=>{
    axios.get("/api")
    .then(res=>setmessage(res.data))
    .catch(err=>console.log(err,typeof(err)));
    },[])
return (
  <div className='min-h-screen flex flex-wrap content between bg-gray-400'>
<div className='w-full'>
<Header/>
<main>
<Outlet/>
</main>
<Footer/>
</div>

   </div>
  )
}

export default App
