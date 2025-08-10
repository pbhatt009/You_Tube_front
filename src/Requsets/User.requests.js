import asynchandeler from "../utils/wraper";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const sendOTP = asynchandeler(async (data) => {
   const result = await axios.post(`${apiUrl}/v1/user/sendEmail`, data, {
    withCredentials: true,
   });
   return result;
})

const sendresetpassword=asynchandeler(async(data)=>{
  const result = await axios.post(`${apiUrl}/v1/user/resetPasswordmail`, data, {
    withCredentials: true,
   });
   return result;


})

const forgotpassword=asynchandeler(async(data)=>{
  const result = await axios.post(`${apiUrl}/v1/user/forgotPassword`, data, {
    withCredentials: true,
   });
   return result;


})

const register = asynchandeler(async (data) => {
  const result = await axios.post(`${apiUrl}/v1/user/register`, data, {
    withCredentials: true,
  });
  return result;
});

const loginreq = asynchandeler(async (data) => {
  const result = await axios.post(`${apiUrl}/v1/user/login`, data, {
    withCredentials: true,
  });
  return result;
});

const logoutreq = asynchandeler(async () => {
  const result = await axios.post(`${apiUrl}/v1/user/logout`, {}, {
    withCredentials: true,
  });
  return result;
});

const updaterefreshtoken = asynchandeler(async () => {
  const result = await axios.post(`${apiUrl}/v1/user/refresh-token`, {}, {
    withCredentials: true,
  });
  return result;
});

const changePassword = asynchandeler(async (data) => {
  const result = await axios.post(`${apiUrl}/v1/user/change-password`, data, {
    withCredentials: true,
  });
  return result;
});

const getcurrentUser = asynchandeler(async () => {
  const result = await axios.get(`${apiUrl}/v1/user/current-user`, {
    withCredentials: true,
  });
  return result;
});

const updateuser = asynchandeler(async (data) => {
  const result = await axios.patch(`${apiUrl}/v1/user/update-user`, data, {
    withCredentials: true,
  });
  return result;
});

const updatecoverimage = asynchandeler(async (data) => {
  const result = await axios.patch(`${apiUrl}/v1/user/update-cover`, data, {
    withCredentials: true,
  });
  return result;
});

const getchanneldetails = asynchandeler(async (channename) => {
  const result = await axios.get(`${apiUrl}/v1/user/channel/${channename}`, {
    withCredentials: true,
  });
  return result;
});

const getwatchhistory = asynchandeler(async () => {
  const result = await axios.get(`${apiUrl}/v1/user/watchHistory`, {
    withCredentials: true,
  });
  return result;
});

const updateavatar = asynchandeler(async (data) => {
  const result = await axios.patch(`${apiUrl}/v1/user/update-avatar`, data, {
    withCredentials: true,
  });
  return result;
});

const updatewatchhistory = asynchandeler(async (videoid) => {
  const result = await axios.patch(`${apiUrl}/v1/user/UpdateWatchHistory/${videoid}`, {}, {
    withCredentials: true,
  });
  return result;
});

const getsubscripition = asynchandeler(async () => {
  const result = await axios.get(`${apiUrl}/v1/user/subscripition`, {
    withCredentials: true,
  });
  return result;
});

export {
  register,
  loginreq,
  logoutreq,
  updaterefreshtoken,
  getcurrentUser,
  updateuser,
  updatecoverimage,
  getchanneldetails,
  getwatchhistory,
  updateavatar,
  updatewatchhistory,
  changePassword,
  getsubscripition,
  sendOTP,
  sendresetpassword,
  forgotpassword
}
