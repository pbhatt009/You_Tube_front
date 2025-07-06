import { use, useCallback, useEffect, useState } from 'react'
import './App.css'

import { Header,Footer,Sidebar,getcurrentUser,updaterefreshtoken} from './utils/index.js';
import { Outlet,Navigate } from 'react-router-dom';

import { login } from './Store/Auth_reducer.jsx';
import { useDispatch,useSelector } from 'react-redux';
function App() {
   const dispatch=useDispatch()
    const[auth,setauth]=useState(false);
    const[loading,setLoading]=useState(true);
    const isAuthenticated = useSelector((state) => state.auth.status);
     if(!isAuthenticated&&auth) setauth(false)
    useEffect( ()=>{ 
      if(!isAuthenticated){
      async function checkAuth(){
    const currentuser=await getcurrentUser();
    if(currentuser.data){
      dispatch(login(currentuser.data.data))
      // console.log("current user",currentuser.data.data);
      setauth(true);
    }
    else{
      const refreshtoken=await updaterefreshtoken();
      if(refreshtoken.data){
        dispatch(login(refreshtoken.data.data))
        // console.log("refreshed user",refreshtoken.data.data);
        setauth(true);
      }
      else{
        setauth(false);
       }
      }

    setLoading(false);}
    checkAuth();
  }
  else{
 
    setauth(true);
    setLoading(false);
  }


},[isAuthenticated])


 if(loading) return <div className="flex items-center justify-center min-h-screen bg-gray-200">
 <div className="flex flex-col items-center space-y-4">
  
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

 
    <p className="text-gray-700 text-lg font-medium">Loading...</p>
  </div>
</div>
 else if(!auth){
  return (
    <Navigate to="/login" replace={true} />
  )
 }

else return (
  
<div className=' bg-gray-300 w-full h-screen'>
 
<Header className="sticky top-0 z-50" />

<div className='flex w-full flex-row h-[80vh] sm:h-[88vh] lg:h-[89vh]'>
<Sidebar/>
<main className=' w-full sm:w-[81vw] lg:w-[85vw] xl:w-[89vw] h-full'>
<Outlet />
</main>
</div>
<div className='w-full h:[8vh]'>
<Footer/>
</div>

</div>
  
   
 
  )
}

export default App
