import { use, useEffect, useState } from 'react'
import './App.css'

import { Header,Footer,Sidebar,getcurrentUser} from './utils/index.js';
import { Outlet,Navigate } from 'react-router-dom';
import { login } from './Store/Auth_reducer.jsx';
import { useDispatch,useSelector } from 'react-redux';
function App() {
   const dispatch=useDispatch()
    const[auth,setauth]=useState(false);
    const[loading,setLoading]=useState(true);
    const isAuthenticated = useSelector((state) => state.auth.status);
    useEffect( ()=>{ 
      if(!isAuthenticated){
      async function checkAuth(){
    const currentuser=await getcurrentUser();
    if(currentuser.data){
      dispatch(login(currentuser.data.data))
      console.log("current user",currentuser.data.data);
      setauth(true);
    }
    setLoading(false);}
    checkAuth();
  }
  else{
 
    setauth(true);
    setLoading(false);
  }


},[])


 if(loading) return <div className="flex items-center justify-center min-h-screen bg-gray-200">
 <div className="flex flex-col items-center space-y-4">
  
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

 
    <p className="text-gray-700 text-lg font-medium">Loading...</p>
  </div>
</div>
 else if(!auth){
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
