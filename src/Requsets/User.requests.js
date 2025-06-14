import asynchandeler from "../utils/wraper";
import axios from "axios";
const register = asynchandeler(async (data) => {
   const result=await axios.post("/api/v1/user/register", data,{
      withCredentials: true,
   })
   return result.data;
  
  })
  
 const login = asynchandeler(async (data) => {
   const result=await axios.post("/api/v1/user/login", data,{
     withCredentials: true,
   })
   return result.data;
  
  })

   const logout = asynchandeler(async () => {
   const result=await axios.post("/api/v1/user/logout",{},{
     withCredentials: true,
   })
   return result.data;
  
  })

  
const  updaterefreshtoken= asynchandeler(async () => {
   const result=await axios.post("/api/v1/user/refresh-token",{},{
     withCredentials: true,
   })
   return result.data;
  
  })
  const changePassword = asynchandeler(async (data) => {
   const result=await axios.post("/api/v1/user/change-password", data,{
     withCredentials: true,
   })
   return result.data;
  
  })

const getcurrentUser = asynchandeler(async () => {
   const result=await axios.get("/api/v1/user/current-user",{
     withCredentials: true,
   })
   return result.data;

  })
   
  const updateuser = asynchandeler(async (data) => {
   const result=await axios.patch("/api/v1/user/update-user", data,{
     withCredentials: true,
   })
   return result.data;
  
  })
 const updatecoverimage= asynchandeler(async (data) => {
   const result=await axios.patch("/api/v1/user/update-cover", data,{
     withCredentials: true,
   })
   return result.data;
  
  })
   const getchanneldetails = asynchandeler(async (channename) => {
     const result=await axios.get(`/api/v1/user/channel/${channename}`,{
       withCredentials: true,
     })
     return result.data;

   })
   const getwatchhistory = asynchandeler(async () => {
     const result=await axios.get('/api/v1/user/watchHistory',{
       withCredentials: true,
     })
     return result.data;

   })
   const updateavatar = asynchandeler(async (data) => {
     const result=await axios.patch('/api/v1/user/update-avatar', data,{
       withCredentials: true,
     })
     return result.data;

   })

   const updatewatchhistory= asynchandeler(async (videoid) => {
     const result=await axios.patch(`/api/v1/user/UpdateWatchHistory/${videoid}`,{},{
       withCredentials: true,
     })
     return result.data;

   })

  export { register, login, logout, updaterefreshtoken, getcurrentUser, updateuser, updatecoverimage, getchanneldetails, getwatchhistory, updateavatar, updatewatchhistory,changePassword};