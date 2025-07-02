import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import LoginPage from "../Pages/Login.jsx";
import RegisterPage from "../Pages/Register.jsx";
import UploadVideopage from "../Pages/Upload_video.jsx"
import HomePage from "../Pages/Home.jsx";
import timeAgo from "./Time_ago.jsx";
import {register, loginreq, logoutreq, updaterefreshtoken, getcurrentUser, updateuser, updatecoverimage, getchanneldetails, getwatchhistory, updateavatar, updatewatchhistory,changePassword} from "../Requsets/User.requests.js"

import {  uploadVideo,
      getAllVideos,
      getVideoById,
      updateVideo,
      deleteVideo,
      increseVideoViews,
      changestatus} from "../Requsets/Video.request.js"





export{
    Header,
    Footer,
    Sidebar,
    LoginPage,
    RegisterPage,
    UploadVideopage,HomePage,
    register, loginreq, logoutreq, updaterefreshtoken, getcurrentUser, updateuser, updatecoverimage, getchanneldetails, getwatchhistory, updateavatar, updatewatchhistory,changePassword,
     uploadVideo,
      getAllVideos,
      getVideoById,
      updateVideo,
      deleteVideo,
      increseVideoViews,
      changestatus,
    timeAgo
}